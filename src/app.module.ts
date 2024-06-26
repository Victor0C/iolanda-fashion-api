import { ConsoleLogger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './db/postgres.config.service';
import { CustomersModule } from './modules/customers/customers.module';
import { ProceduresModule } from './modules/procedures/procedures.module';
import { ProductsModule } from './modules/products/products.module';
import { SalesModule } from './modules/sales/sales.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FilterErrors } from './utilities/Errors/filterErrors';
import { UuidValidationMiddleware } from './utilities/Middlewares/uuidValidation.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerGlobalInterceptor } from './utilities/logger/logger-global.interceptor';
import { AppController } from './app.controller';


@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProceduresModule,
    CustomersModule,
    SalesModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers:[AppController],
  providers:[
    ConsoleLogger,
    {
      provide: APP_FILTER,
      useClass: FilterErrors
    },
    {
      provide: APP_INTERCEPTOR,
      useClass:LoggerGlobalInterceptor
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
