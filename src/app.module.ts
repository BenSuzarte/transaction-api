import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { User } from './user/entity/user.entity';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './src/database/db.sqlite',
      entities: [User],
      synchronize: true
    }),
    
    UserModule,
    AccountModule,
    TransactionModule

  ],
})
export class AppModule {}
