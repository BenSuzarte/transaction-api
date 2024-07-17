import { AccountService } from 'src/account/account.service';
import { HttpException, Injectable, InternalServerErrorException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {

  constructor( 

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountService: AccountService

  ) {}

  async new( data: CreateUserDTO ) {

    const { accountType, ...rest } = data;

    const isValidNewUser = await this.validateNewUser(data);

    if( isValidNewUser instanceof HttpException ) {
      throw isValidNewUser;
    }

    const newUser = {
      ...rest
    }

    const user = await this.userRepository.save(this.userRepository.create(newUser));

    if(!user) {
      throw new InternalServerErrorException("Unexpected error to create user")
    }

    const newAccount = {
      type: accountType,
      user: user
    }

    const userAccount = await this.accountService.createAccount(newAccount);

    user.accounts = [userAccount]
    await this.userRepository.save(user)

    if(!userAccount) {
      throw new InternalServerErrorException("Unexpected error to create user")
    }

    return { user }

  }

  async validateNewUser( data: CreateUserDTO ) {

  const { email, document } = data;
  const isUser = !!await this.userRepository.findOne({ where: { email, document } });

  if( isUser ) {
    return new UnprocessableEntityException("This user already exists")
  }

  }

  async getUserByEmail( email: string ) {
    return await this.userRepository.findOne({ where: { email } })
  }

}
