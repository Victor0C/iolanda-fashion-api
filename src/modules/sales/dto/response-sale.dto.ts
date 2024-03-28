import { ResponseUser } from "src/modules/users/dto/response-user.dto";
import { SaleEntity } from "../entities/sale.entity";

export class ResponseSale {
    constructor(sale: SaleEntity) {

        delete sale.deletedAT

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
                    if (procedurePerformed?.procedure) {
                        delete procedurePerformed.procedure.createdAT
                        delete procedurePerformed.procedure.updatedAT
                        delete procedurePerformed.procedure.deletedAT
                    }
                }
            )
        }

        if (sale.productsSold) {
            sale.productsSold.forEach(
                (productsSold) => {
                    if (productsSold?.product) {
                        delete productsSold.product.createdAT
                        delete productsSold.product.updatedAT
                        delete productsSold.product.deletedAT
                    }
                }
            )
        }

        return sale
    }
}