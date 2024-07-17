import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
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

    const isValidTransaction = await this.validate(data);

    if( isValidTransaction instanceof HttpException ) {
      throw isValidTransaction;
    }

  }

  async validate(data: SendTransactionDTO) {
    const sender = await this.accountService.findAccountByNumber(data.sender);

    if( !sender ) {
      return new NotFoundException("This sender account wasn't found");
    }

    const senderAccountType = await this.accountService.getAccountTypeByNumber(data.sender)

    if( senderAccountType === "merchant" ) {
      return new ForbiddenException("Merchant accounts cannot perform transactions")
    }

    if( data.value > sender.balance ) {
      return new ForbiddenException("Insufficient balance");
    }

    if( data.value <= 0 ) {
      return new BadRequestException("Transaction amount must be greater than zero");
    }

    const receiver = await this.accountService.findAccountByNumber(data.receiver);

    if ( !receiver ) {
      return new NotFoundException("This receiver account wasn't found")
    }
  }

}
