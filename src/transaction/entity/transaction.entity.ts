import { Account } from "src/account/entity/account.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionType } from "./transaction-type.entity";

@Entity('transactions')
export class Transaction {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: number;

  //Body
  @Column({ type: 'float', nullable: false })
  amount: number;

  //Relationship(s)
  @ManyToOne(() => TransactionType, transactionType => transactionType.transactions, { nullable: false })
  type: TransactionType;

  @ManyToOne(() => Account, account => account.transactions)
  sender: Account;

  @ManyToOne(() => Account, account => account.transactions)
  receiver: Account;

  //Date(s)
  @CreateDateColumn()
  createdAt: Date;

}