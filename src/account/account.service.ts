import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { Repository } from 'typeorm';
import { AccountType } from './entity/account-type.entity';
import { AccountTypeDTO } from './dto/account.dto';

@Injectable()
export class AccountService {

  constructor(

    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(AccountType)
    private readonly accountTypeRepository: Repository<AccountType>

  ) {}

  async createAccountType(data: AccountTypeDTO) {
    const newAccountType = { ...data } as AccountType;
    return await this.accountTypeRepository.save(this.accountTypeRepository.create(newAccountType));
  }

  async getAccountTypes() {
    return await this.accountTypeRepository.find()
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
    await this.incrementBalance( receiverCode, value );
  }

}
