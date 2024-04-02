import { ProductEntity } from '../../products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SaleEntity } from './sale.entity';

@Entity('products_sold')
export class ProductsSoldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @ManyToOne(() => ProductEntity, (product) => product.productSold)
  product: ProductEntity;

  @ManyToOne(() => SaleEntity, (sale) => sale.productsSold, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  sale: SaleEntity;

  @Column({name: 'price', type: 'numeric', precision: 10, scale: 2, nullable: false})
  price: number;
}
