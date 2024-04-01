import { UserEntity } from "../entities/users.entity";

export class ResponseUser {
    constructor(user: UserEntity) {
        delete user.password
        delete user.deletedAT

        return user
    }
}