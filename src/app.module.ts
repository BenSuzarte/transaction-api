import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { User } from './user/entity/user.entity';
import { TransactionModule } from './transaction/transaction.module';
import { Transaction } from './transaction/entity/transaction.entity';
import { TransactionType } from './transaction/entity/transaction-type.entity';
import { Account } from './account/entity/account.entity';
import { AccountType } from './account/entity/account-type.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/db.sqlite',
      entities: [
        User, 
        Transaction, 
        TransactionType, 
        Account, 
        AccountType
      ],
      synchronize: true
    }),
    
    UserModule,
    AccountModule,
    TransactionModule

  ],
})
export class AppModule {}
