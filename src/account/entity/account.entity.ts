import { Transaction } from "src/transaction/entity/transaction.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AccountType } from "./account-type.entity";

@Entity('accounts')
export class Account {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: number;

  //Body
  @Column({ type: 'text', nullable: false, unique: true })
  code: string;

  @Column({ type: 'float', default: 0 })
  balance: number;

  //Relationship(s)
  @ManyToOne(() => AccountType, accountType => accountType.account)
  type: AccountType;

  @ManyToOne(() => User, user => user.accounts, { nullable: false })
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