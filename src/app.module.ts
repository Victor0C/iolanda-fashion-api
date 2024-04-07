import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { CustomersModule } from './modules/customers/customers.module';
import { ProceduresModule } from './modules/procedures/procedures.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { FilterErrors } from './utilities/Errors/filterErrors';
import { UuidValidationMiddleware } from './utilities/Middlewares/uuidValidation.middleware';


@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProceduresModule,
    CustomersModule,
    SalesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  providers:[
    {
      provide: APP_FILTER,
      useClass: FilterErrors
    }
  ]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidValidationMiddleware).forRoutes(
      'users/:id',
      'sales/:id',
      'products/:id',
      'procedures/:id',
      'customers/:id'
    )
  }
}
