import { ProductEntity } from "../../products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SaleEntity } from "./sale.entity";

@Entity('products_sold')
export class ProductsSoldEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => ProductEntity, product => product.productSold)
    product: ProductEntity

    @ManyToOne(() => SaleEntity, sale => sale.productsSold)
    sale: SaleEntity

    @Column({ name: 'amount', nullable: false })
    amount: number

    @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2, nullable: false })
    price: number
}