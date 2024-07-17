import { BadRequestException, ForbiddenException, HttpException, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTransactionTypeDTO, SendTransactionDTO } from './dto/transaction.dto';
import { AccountService } from 'src/account/account.service';
import { TransactionType } from './entity/transaction-type.entity';

@Injectable()
export class TransactionService {

  constructor(

    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(TransactionType)
    private readonly transactionTypeRepository: Repository<TransactionType>,

    private readonly accountService: AccountService

  ) {}

  async send(data: SendTransactionDTO) {

    const { sender, receiver, value } = data;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction()

    try {
      
      const isValidTransaction = await this.validate(data);

      if( isValidTransaction instanceof HttpException ) {
        throw isValidTransaction;
      }

      const authorization = await this.accountService.transfer(sender, receiver, value);
      if( authorization instanceof HttpException ) {
        throw authorization
      }

      const newTransaction = {
        amount: data.value,
        ...isValidTransaction
      } as Transaction;

      const transaction = await queryRunner.manager.create(Transaction, newTransaction)

      await queryRunner.commitTransaction();
      return transaction;

    } catch (error) {

      await queryRunner.rollbackTransaction();

      if( error instanceof HttpException ) {
        throw error
      }
      throw new NotImplementedException("Was not possible to proceed with the transaction");

    } finally {
      await queryRunner.release();
    }

  }

  async validate(data: SendTransactionDTO) {
    const sender = await this.accountService.findAccountByNumber(data.sender);

    if( !sender ) {
      return new NotFoundException("This sender account wasn't found");
    }

    const senderAccountType = await this.accountService.getAccountTypeByNumber(data.sender)

    if( senderAccountType.type === "merchant" ) {
      return new ForbiddenException("Merchant accounts cannot perform transactions")
    }

    const transactionType = await this.getTransactionType(data.type);

    if( !transactionType ) {
      return new ForbiddenException("There isn't this transaction type");
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

    return { sender, receiver, type: transactionType };
  }

  async getTransactionType(type: string) {
    return await this.transactionTypeRepository.findOne({ where: { type } });
  }

  async newTransactionType( data: CreateTransactionTypeDTO ) {
    return await this.transactionTypeRepository.save(this.transactionTypeRepository.create(data));
  }

}
