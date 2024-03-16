import { UserEntity } from "../entities/users.entity";

export class ResponseUser {
    constructor(user: UserEntity) {
        delete user.deletedAT

        return user
    }
}