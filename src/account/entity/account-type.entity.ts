import { Account } from 'src/account/entity/account.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('account_types')
export class AccountType {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: number;

  //Body
  @Column({ type: 'text', nullable: false })
  type: string;

  //Relationship(s)
  @OneToMany(() => Account, account => account.type)
  account: Account[];

}