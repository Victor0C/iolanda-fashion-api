import { CustomerEntity } from '../../customers/entities/customer.entity';
import { UserEntity } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProceduresPerformedEntity } from './proceduresPerformed.entity';
import { ProductsSoldEntity } from './productsSold.entity';

@Entity('sales')
export class SaleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.sales)
  user: UserEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.sales)
  customer: CustomerEntity;

  @OneToMany(() => ProceduresPerformedEntity, (proceduresPerformed) => proceduresPerformed.sale, { cascade: true })
  proceduresPerformed: ProceduresPerformedEntity[];

  @OneToMany(() => ProductsSoldEntity, (productSold) => productSold.sale, {cascade: true})
  productsSold: ProductsSoldEntity[];

  @Column({name: 'price',type: 'numeric', precision: 10, scale: 2, nullable: false,})
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAT: String;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAT: string;
}
