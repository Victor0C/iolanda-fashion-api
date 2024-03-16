import { Column, CreateDateColumn, DeleteDateColumn, Entity, NumericType, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'product' })
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', length: '255', nullable: false })
    name: string

    @Column({ name: 'description', length: '255', nullable: false })
    description: string

    @Column({ name: 'amount', nullable: false })
    amount: number

    @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2, nullable: false })
    price: number

    @CreateDateColumn({ name: 'created_at' })
    createdAT: String;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAT: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAT: string;

}
