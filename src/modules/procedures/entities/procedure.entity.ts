import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProceduresPerformedEntity } from '../../sales/entities/proceduresPerformed.entity';

@Entity({ name: 'procedure' })
export class ProcedureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 255, nullable: false })
  name: string;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @OneToMany(
    () => ProceduresPerformedEntity,
    (procedurePerformed) => procedurePerformed.procedure,
  )
  proceduresPerformed: ProceduresPerformedEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAT: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAT: string;
}
