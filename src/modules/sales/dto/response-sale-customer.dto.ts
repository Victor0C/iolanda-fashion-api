import { ApiProperty } from "@nestjs/swagger";
import { CustomerEntity } from "src/modules/customers/entities/customer.entity";

export class ResponseCustomerForSale{
    constructor(customer: CustomerEntity){
        delete customer.cpf
        delete customer.tel
        delete customer.whatsapp
        delete customer.address
        delete customer.createdAT
        delete customer.updatedAT
        delete customer.deletedAT

        return customer
    }

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string
}