import { CustomerEntity } from "../entities/customer.entity";

export class ResponseCustomer {
    constructor(customer: CustomerEntity) {
        delete customer.deletedAT
        if (customer.address) {
            delete customer.address.id
            delete customer.address.deletedAT
        }

        return customer
    }
}