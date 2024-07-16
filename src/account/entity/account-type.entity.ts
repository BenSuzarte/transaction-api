import { Account } from 'src/account/entity/account.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccountType {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: number;

  //Body
  @Column({ type: 'text', nullable: false })
  type: string;

  //Relationship(s)
  @ManyToOne(() => Account, account => account.type)
  account: Account;

}