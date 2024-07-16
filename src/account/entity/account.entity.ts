import { Transaction } from "src/transaction/entity/transaction.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccountType } from "./account-type.entity";

@Entity()
export class Account {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: number;

  //Body
  @Column({ type: 'text', nullable: false, unique: true })
  number: string;

  @Column({ type: 'double', default: 0 })
  balance: number;

  //Relationship(s)
  @OneToMany(() => AccountType, accountType => accountType.account, { nullable: false })
  type: AccountType;

  @ManyToOne(() => User, user => user.accounts)
  user: User

  @OneToMany(() => Transaction, transaction => transaction.sender)
  @OneToMany(() => Transaction, transaction => transaction.receiver)
  transactions: Transaction[]

  //Dates
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}