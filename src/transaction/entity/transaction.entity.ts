import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transferencia {

  @PrimaryGeneratedColumn('identity')
  id: number;

  // @ManyToOne(() => Conta, conta => conta.tranferencias)
  // origem: Conta;

  // @ManyToOne(() => Conta, conta => conta.tranferencias)
  // destino: Conta;

  @Column({ type: 'double', nullable: false })
  valor: number;

  @Column({ type: 'text', nullable: false })
  tipo: string;

  @CreateDateColumn()
  createdAt: string;

}