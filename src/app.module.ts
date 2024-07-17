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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [__dirname + "/**/*.entity{.js,.ts}"]
    }),
    
    UserModule,
    AccountModule,
    TransactionModule

  ],
})
export class AppModule {}
