import { ProcedureEntity } from "../../procedures/entities/procedure.entity"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { SaleEntity } from "./sale.entity"

@Entity('procedures_perfomed')
export class ProceduresPerformedEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'amount', nullable: false })
    amount: number

    @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2, nullable: false })
    price: number

    @ManyToOne(() => ProcedureEntity, procedure => procedure.proceduresPerformed)
    procedure: ProcedureEntity


    @ManyToOne(() => SaleEntity, sale => sale.proceduresPerformed)
    sale: SaleEntity
}