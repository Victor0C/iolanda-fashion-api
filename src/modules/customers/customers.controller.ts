import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminInterceptor } from '../auth/admin.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomer } from './dto/response-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiBearerAuth()
@ApiTags('Customers')
@UseGuards(AuthGuard)
@Controller('/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

  @ApiOperation({ summary: 'Get data from a customer' })
  @ApiResponse({
      status:200,
      description:'Customer data returned successfully',
      type: ResponseCustomer
  })
  @Get('/:id')
  public async findOneCustomer(@Param('id') id: string): Promise<ResponseCustomer> {
    return this.customersService.findOneCustomer(id)
  }

  @ApiOperation({ summary: 'Get data from all customer' })
  @ApiResponse({
      status:200,
      description:'Customers data returned successfully',
      type: [ResponseCustomer]
  })
  @Get()
  public async findAllCustomers(): Promise<ResponseCustomer[]> {
    return this.customersService.findAllCustomers()
  }

  @ApiOperation({ summary: 'Create a customer' })
  @ApiResponse({
      status:200,
      description:'Customer created successfully',
      type: [ResponseCustomer]
  })
  @ApiBody({type: CreateCustomerDto})
  @Post()
  public async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<ResponseCustomer> {
    return this.customersService.createCustomer(createCustomerDto)
  }

  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({
      status:200,
      description:'Customer updated successfully',
      type: [ResponseCustomer]
  })
  @ApiBody({type: UpdateCustomerDto})
  @Put('/:id')
  public async updateCustomer(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<ResponseCustomer> {
    return this.customersService.updateCustomer(id, updateCustomerDto)
  }

  @ApiOperation({ summary: 'Delete a customer' })
  @ApiResponse({
      status:204,
      description:'Customer deleted successfully',
  })
  @UseInterceptors(AdminInterceptor)
  @Delete('/:id')
  @HttpCode(204)
  public async deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customersService.deleteCustomer(id)
  }
}
