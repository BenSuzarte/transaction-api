import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'double', nullable: false })
  amount: number;

  @Column({ type: 'text', nullable: false })
  type: string;

  @CreateDateColumn()
  createdAt: string;

}