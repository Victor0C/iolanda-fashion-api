import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';
import { ProceduresModule } from '../procedures/procedures.module';
import { CustomersModule } from '../customers/customers.module';


@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProceduresModule,
    CustomersModule,
    TypeOrmModule.forFeature([SaleEntity])
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }
