import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ResponseCustomer } from './dto/response-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(@InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>) { }

  public async findOneCustomer(id: string): Promise<ResponseCustomer> {
    const customer = await this.customerRepository.findOne({ where: { id }, relations: { address: true } })

    if (!customer) throw new NotFoundException(`Customer not found (id: ${id})`)

    return new ResponseCustomer(customer)
  }

  public async findAllCustomers(): Promise<ResponseCustomer[]> {
    const customers = await this.customerRepository.find()

    return customers.map((customer) => new ResponseCustomer(customer))
  }

  public async createCustomer(createCustomerDto: CreateCustomerDto): Promise<ResponseCustomer> {
    const customerEntity = new CustomerEntity()

    Object.assign(customerEntity, createCustomerDto as CustomerEntity)

    const custumer = await this.customerRepository.save(customerEntity)

    return new ResponseCustomer(custumer)
  }

  public async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto): Promise<ResponseCustomer> {
    const customer = await this.findOneCustomer(id)

    Object.assign(customer, updateCustomerDto as CustomerEntity)

    const updatedCustomer = await this.customerRepository.save(customer)


    return new ResponseCustomer(updatedCustomer)
  }

  public async deleteCustomer(id: string): Promise<void> {

    await this.findOneCustomer(id)
    await this.customerRepository.delete(id)
  }
}
