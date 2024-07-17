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

  async findAccountByNumber( number: string ) {
    return await this.repository.findOne({ where: { number } });
  }

  async getAccountTypeByNumber( number: string ) {
    const account = await this.repository.findOne( { where: { number }, relations: ["type"] } );
    return account ? account.type.type : null
  }

}
