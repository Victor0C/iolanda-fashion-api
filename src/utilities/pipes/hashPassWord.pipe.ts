import { PipeTransform } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from "src/modules/users/dto/update-users.dto";

export class HashPassWord implements PipeTransform{    
    public async transform(userDTO: UpdateUserDTO):Promise<UpdateUserDTO> {
       const sal = process.env.SALT
       if(userDTO.password)
        userDTO.password = await bcrypt.hash(userDTO.password, sal!)

       return userDTO
    }
}