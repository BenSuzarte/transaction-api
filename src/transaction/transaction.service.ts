import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { Repository } from 'typeorm';
import { SendTransactionDTO } from './dto/transaction.dto';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class TransactionService {

  constructor(

    @InjectRepository(Transaction)
    private readonly repository: Repository<Transaction>,

    private readonly accountService: AccountService

  ) {}

  async send(data: SendTransactionDTO) {

    const sender = await this.accountService.findAccountByNumber(data.sender);

    if( !sender ) {
      throw new NotFoundException("This sender account wasn't found");
    }

    const senderAccountType = await this.accountService.getAccountTypeByNumber(data.sender)

    if( senderAccountType === "merchant" ) {
      throw new ForbiddenException("Merchant accounts cannot perform transactions")
    }

    if( data.value > sender.balance ) {
      throw new ForbiddenException("Insufficient balance");
    }

    if( data.value <= 0 ) {
      throw new BadRequestException("Transaction amount must be greater than zero");
    }

    const receiver = await this.accountService.findAccountByNumber(data.receiver);

    if ( !receiver ) {
      throw new NotFoundException("This receiver account wasn't found")
    }

  }

}
