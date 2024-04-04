import { ResponseUser } from "src/modules/users/dto/response-user.dto";
import { SaleEntity } from "../entities/sale.entity";

export class ResponseSale {
    constructor(sale: SaleEntity) {

        delete sale.deletedAT

        sale.price = sale.price / 100

        if (sale.user) {
            delete sale.user.type
            delete sale.user.password
            delete sale.user.createdAT
            delete sale.user.updatedAT
            delete sale.user.deletedAT
        }

        if (sale.customer) {
            delete sale.customer.createdAT
            if (sale.customer.deletedAT) delete sale.customer.deletedAT
            delete sale.customer.updatedAT
            delete sale.customer.cpf
            delete sale.customer.tel
            delete sale.customer.whatsapp
            delete sale.customer.address
        }

        if (sale.proceduresPerformed) {
            sale.proceduresPerformed.forEach(
                (procedurePerformed) => {

                    procedurePerformed.price = procedurePerformed.price / 100

                    if (procedurePerformed?.procedure) {
                        delete procedurePerformed.procedure
                    }
                }
            )
        }

        if (sale.productsSold) {
            sale.productsSold.forEach(
                (productsSold) => {

                    productsSold.price = productsSold.price / 100

                    if (productsSold?.product) {
                        delete productsSold.product
                    }
                }
            )
        }

        return sale
    }
}