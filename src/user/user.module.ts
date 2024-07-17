import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AccountModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
