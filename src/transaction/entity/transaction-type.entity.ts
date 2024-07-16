import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class TransactionType {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: string;

  //Body
  @Column({ type: 'text', nullable: false })
  type: string;

  @OneToMany(() => Transaction, transaction => transaction.type)
  transactions: Transaction[];

}