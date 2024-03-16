import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeUser } from '../enums/typeUser.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 255, nullable: false })
  name: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'type', length: 13, enum: TypeUser, nullable: false })
  type: TypeUser;

  @CreateDateColumn({ name: 'created_at' })
  createdAT: String;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAT: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAT: string;
}
