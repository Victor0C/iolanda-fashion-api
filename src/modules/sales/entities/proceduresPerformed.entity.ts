import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProcedureEntity } from '../../procedures/entities/procedure.entity';
import { SaleEntity } from './sale.entity';

@Entity('procedures_perfomed')
export class ProceduresPerformedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @ManyToOne(
    () => ProcedureEntity,
    (procedure) => procedure.proceduresPerformed,
  )
  procedure: ProcedureEntity;

  @ManyToOne(() => SaleEntity, (sale) => sale.proceduresPerformed, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  sale: SaleEntity;
}
