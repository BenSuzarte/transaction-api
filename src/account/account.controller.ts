import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountTypeDTO } from './dto/account.dto';

@Controller('account')
export class AccountController {

  constructor( private readonly accountService: AccountService ) {}

  @Post('type/create')
  async createAccountType( @Body() body: AccountTypeDTO ) {
    return await this.accountService.createAccountType(body)
  }

  @Get('types')
  async getTypes() {
    return await this.accountService.getAccountTypes()
  }

}
