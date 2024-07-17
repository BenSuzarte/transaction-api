import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

  constructor( private readonly userService: UserService ) {}

  @Post('create')
  async create( @Body() body: CreateUserDTO ) {
    return await this.userService.new(body);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string) {
    return await this.userService.getUserByEmail(email);
  }

}
