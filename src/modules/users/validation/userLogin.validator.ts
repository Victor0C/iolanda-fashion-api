import { Injectable, NotFoundException } from "@nestjs/common";
import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsersService } from "../users.service";


@ValidatorConstraint({ async: true })
@Injectable()
export class UserLoginValidator implements ValidatorConstraintInterface {
    constructor(private readonly userService: UsersService) {}
    
    async validate(value: string): Promise<boolean>{
    try {
        const userLogin = await this.userService.findUserLogin(value)

        return !userLogin
    } 
    catch (error){
        if (error instanceof NotFoundException){
            return true
        }

        throw error;
    }
  }
}

export const UserLogin = (optionsValidation: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: optionsValidation,
      constraints: [],
      validator: UserLoginValidator,
    });
  };
};