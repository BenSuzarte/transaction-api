import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SendTransactionDTO } from './dto/transaction.dto';

@Controller('transfer')
export class TransactionController {

  constructor( private readonly service: TransactionService ) {}

  @Post()
  async generate( @Body() data: SendTransactionDTO ) {
    return await this.service.send(data);
  }

}
