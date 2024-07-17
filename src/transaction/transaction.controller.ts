import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionTypeDTO, SendTransactionDTO } from './dto/transaction.dto';

@Controller('transfer')
export class TransactionController {

  constructor( private readonly service: TransactionService ) {}

  @Post()
  async generate( @Body() data: SendTransactionDTO ) {
    return await this.service.send(data);
  }

  @Post('type/create')
  async createTransferType( @Body() body: CreateTransactionTypeDTO ) {
    return await this.service.newTransactionType(body);
  }

}
