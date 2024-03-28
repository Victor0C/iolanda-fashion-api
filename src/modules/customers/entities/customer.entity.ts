import { SaleEntity } from "../../sales/entities/sale.entity"
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { AddressEntity } from "./address.entity"

@Entity({ name: 'customers' })
export class CustomerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name', length: 255, nullable: false })
    name: string

    @Column({ name: 'cpf', length: 11, nullable: false })
    cpf: string

    @Column({ name: 'tel', length: 11, nullable: false })
    tel: string

    @Column({ name: 'whatsapp', nullable: false })
    whatsapp: boolean

    @OneToOne(() => AddressEntity, adress => adress.customers, { cascade: true })
    @JoinColumn()
    address: AddressEntity

    @OneToMany(() => SaleEntity, sale => sale.customer)
    sales: SaleEntity

    @CreateDateColumn({ name: 'created_at' })
    createdAT: String;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAT: string;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAT: string;
}
