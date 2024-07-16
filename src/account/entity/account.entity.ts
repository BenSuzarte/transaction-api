import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Account {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'text', nullable: false, unique: true })
  number: string;

  @Column({ type: 'double', default: 0 })
  balance: number;

  // @ManyToOne(() => User, user => user.contas)
  // user: User;

  // @OneToMany(() => Transferencia, transferencia => transferencia.origem)
  // tranferencias: Transferencia[]

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}