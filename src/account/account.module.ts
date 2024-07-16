import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { AccountType } from './entity/account-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType])]
})
export class AccountModule {}
