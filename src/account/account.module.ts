import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { AccountType } from './entity/account-type.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountType]), HttpModule],
  providers: [AccountService],
  exports: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
