import { ApiProperty } from "@nestjs/swagger";
import { CustomerEntity } from "../entities/customer.entity";
import { ResponseAddress } from "./response-address.dto";
import { AddressEntity } from "../entities/address.entity";

export class ResponseCustomer {
    constructor(customer: CustomerEntity) {
        delete customer.deletedAT
        if (customer.address) {
            customer.address = new ResponseAddress(customer.address) as AddressEntity
        }

        return customer
    }

    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    cpf: string

    @ApiProperty()
    tel: string

    @ApiProperty()
    whatsapp: boolean

    @ApiProperty({type: () => ResponseAddress})
    address: ResponseAddress

    @ApiProperty()
    createdAT: String;

    @ApiProperty()
    updatedAT: string;
}