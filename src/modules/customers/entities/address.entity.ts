import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cep', length: 8, nullable: false })
  cep: string;

  @Column({ name: 'city', length: 255, nullable: false })
  city: string;

  @Column({ name: 'state', length: 255, nullable: false })
  state: string;

  @Column({ name: 'road', length: 255, nullable: false })
  road: string;

  @Column({ name: 'neighborhood', length: 255, nullable: false })
  neighborhood: string;

  @Column({ name: 'number', nullable: false })
  number: number;

  @Column({ name: 'complement', length: 255, nullable: false })
  complement: string;

  @OneToOne(() => CustomerEntity, (customer) => customer.address)
  customers: CustomerEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAT: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAT: string;
}
