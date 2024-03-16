import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ProceduresModule } from './procedures/procedures.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ProceduresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CustomersModule,
  ],
})
export class AppModule { }
