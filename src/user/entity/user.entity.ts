import { Account } from "src/account/entity/account.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

  //Id
  @PrimaryGeneratedColumn('identity')
  id: number;

  //Body
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false, unique: true })
  document: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  //Relationship(s)
  @OneToMany(() => Account, account => account.user)
  accounts: Account[]

  //Date(s)
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}