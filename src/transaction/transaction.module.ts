import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entity/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { AccountModule } from 'src/account/account.module';
import { TransactionType } from './entity/transaction-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionType]), AccountModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
