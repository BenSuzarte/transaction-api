import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { Repository } from 'typeorm';
import { AccountType } from './entity/account-type.entity';
import { AccountTypeDTO, CreateAccountDTO } from './dto/account.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountService {

  constructor(

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>,

    private readonly httpService: HttpService

  ) {}

  async createAccount( data: CreateAccountDTO ) {
    const accountType = await this.getAccountTypeByName(data.type)

    const newAccount = {
      ...data,
      code: String(Math.floor(Math.random() * 10001)),
      type: accountType
    };

    return await this.accountRepository.save(this.accountRepository.create(newAccount));
  }

  async getAccounts() {
    return await this.accountRepository.find();
  }

  async createAccountType(data: AccountTypeDTO) {
    const newAccountType = { ...data } as AccountType;
    return await this.accountTypeRepository.save(this.accountTypeRepository.create(newAccountType));
  }

  async getAccountTypes() {
    return await this.accountTypeRepository.find();
  }

  async getAccountTypeByName( type: string ) {
    return await this.accountTypeRepository.findOne({ where: { type } });
  }

  async deleteAccountType(id: number) {
    const result = await this.accountTypeRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Account type with ID "${id}" not found`);
    }
  }

  async findAccountByNumber( code: string ) {
    return await this.accountRepository.findOne({ where: { code } });
  }

  async getAccountTypeByNumber( code: string ) {
    const account = await this.accountRepository.findOne( { where: { code }, relations: ["type"] } );
    return account ? account.type : null
  }

  async incrementBalance( code: string, amount: number ) {
    return await this.accountRepository.increment( { code }, 'balance', amount );
  }

  async decrementBalance( code: string, amount: number ) {
    return await this.accountRepository.decrement( { code }, 'balance', amount );
  }

  async transfer( senderCode: string, receiverCode: string, value: number ) {
    await this.decrementBalance( senderCode, value );

    const response = await firstValueFrom(this.httpService.get(process.env.CONFIRM_TRANSFER_API))
    if( !response.status ) {
      return new UnauthorizedException("This transaction was not authorized");
    }

    await this.incrementBalance( receiverCode, value );
  }

}
