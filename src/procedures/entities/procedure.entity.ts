import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'procedure' })
export class ProcedureEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', length: 255, nullable: false })
    name: string

    @Column({ name: 'description', length: 255, nullable: false })
    description: string

    @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2, nullable: false })
    price: number

    @CreateDateColumn({ name: 'created_at' })
    createdAT: String;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAT: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAT: string;
}
