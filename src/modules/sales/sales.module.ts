import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from '../customers/customers.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import { BuildersForSales } from './buildersForSales';
import { ProductsSoldEntity } from './entities/productsSold.entity';
import { SaleEntity } from './entities/sale.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProceduresModule,
    CustomersModule,
    TypeOrmModule.forFeature([SaleEntity, ProductsSoldEntity]),
  ],
  controllers: [SalesController],
  providers: [SalesService, BuildersForSales],
})
export class SalesModule {}
