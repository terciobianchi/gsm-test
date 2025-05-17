import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { AbstractDto } from "../../common/dto/abstract.dto";

export class UserDto extends AbstractDto {
  
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  username: string;
  
  @IsNotEmpty()
  @MinLength(8)
  password: string | null;
  
}
