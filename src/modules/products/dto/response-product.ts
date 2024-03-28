import { ProductEntity } from "../entities/product.entity";

export class ResponseProduct {
    constructor(product: ProductEntity) {
        delete product.deletedAT

        return product
    }
}