import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

  constructor(

    @InjectRepository(Account)
    private readonly repository: Repository<Account>

  ) {}

  async findAccountByNumber( code: string ) {
    return await this.repository.findOne({ where: { code } });
  }

  async getAccountTypeByNumber( code: string ) {
    const account = await this.repository.findOne( { where: { code }, relations: ["type"] } );
    return account ? account.type.type : null
  }

}
