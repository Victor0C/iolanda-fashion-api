import { PartialType } from "@nestjs/mapped-types";
import { UserDTO } from "./create-users.dto";

export class UpdateUserDTO extends PartialType(UserDTO){}