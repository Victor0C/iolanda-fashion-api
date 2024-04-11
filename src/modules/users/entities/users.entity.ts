import { SaleEntity } from '../../sales/entities/sale.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypesUser } from '../enums/typesUser.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 255, nullable: false })
  name: string;

  @Column({ name: 'user_Login', length: 255, nullable: false })
  userLogin: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'type', length: 13, enum: TypesUser, nullable: false })
  type: TypesUser;

  @OneToMany(() => SaleEntity, (sale) => sale.user)
  sales: SaleEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAT: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAT: string;
}
