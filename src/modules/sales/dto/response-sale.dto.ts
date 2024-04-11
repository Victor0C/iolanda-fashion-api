import { UserEntity } from 'src/modules/users/entities/users.entity';
import { SaleEntity } from '../entities/sale.entity';
import { ResponseUserForSale } from './response-sale-user.dto';
import { ResponseCustomerForSale } from './response-sale-customer.dto';
import { CustomerEntity } from 'src/modules/customers/entities/customer.entity';
import { ResponseProceduresPerfomerdForSales } from './response-sale-proceduresPerformed.dto';
import { ProceduresPerformedEntity } from '../entities/proceduresPerformed.entity';
import { ProductsSoldEntity } from '../entities/productsSold.entity';
import { ResponseProducstSoldForSales } from './response-sale-productsSold-dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseSale {
  constructor(sale: SaleEntity) {
    delete sale.deletedAT;

    sale.user = new ResponseUserForSale(sale.user) as UserEntity;

    sale.customer = new ResponseCustomerForSale(
      sale.customer,
    ) as CustomerEntity;

    if (sale.proceduresPerformed) {
      sale.proceduresPerformed = sale.proceduresPerformed.map(
        (procedurePerformed) =>
          new ResponseProceduresPerfomerdForSales(
            procedurePerformed,
          ) as ProceduresPerformedEntity,
      );
    }

    if (sale.productsSold) {
      sale.productsSold = sale.productsSold.map(
        (productSold) =>
          new ResponseProducstSoldForSales(productSold) as ProductsSoldEntity,
      );
    }

    return sale;
  }

  @ApiProperty()
  id: string;

  @ApiProperty({ type: ResponseUserForSale })
  user: ResponseUserForSale;

  @ApiProperty({ type: ResponseUserForSale })
  customer: ResponseCustomerForSale;

  @ApiProperty({ type: ResponseProceduresPerfomerdForSales, isArray: true })
  proceduresPerformed: ResponseProceduresPerfomerdForSales[];

  @ApiProperty({ type: ResponseProducstSoldForSales, isArray: true })
  productsSold: ResponseProducstSoldForSales[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAT: string;

  @ApiProperty()
  updatedAT: string;
}
