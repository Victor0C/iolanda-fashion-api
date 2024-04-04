import { ProductEntity } from "../entities/product.entity";

export class ResponseProduct {
    constructor(product: ProductEntity) {
        delete product.deletedAT

        product.price = product.price / 100

        return product
    }
}