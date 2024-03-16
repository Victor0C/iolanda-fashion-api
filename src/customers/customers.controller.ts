import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomer } from './dto/response-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @Get('/:id')
  public async findOneCustomer(@Param('id') id: string): Promise<ResponseCustomer> {

    return this.customersService.findOneCustomer(id)
  }

  @Get()
  public async findAllCustomers(): Promise<ResponseCustomer[]> {

    return this.customersService.findAllCustomers()
  }

  @Post()
  public async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<ResponseCustomer> {

    return this.customersService.createCustomer(createCustomerDto)
  }

  @Put('/:id')
  public async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<ResponseCustomer> {

    return this.customersService.updateCustomer(id, updateCustomerDto)
  }

  @Delete('/:id')
  @HttpCode(204)
  public async deleteCustomer(@Param('id') id: string): Promise<void> {

    return this.customersService.deleteCustomer(id)
  }
}
