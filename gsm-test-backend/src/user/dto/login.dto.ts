import { IsNotEmpty } from "class-validator";
import { AbstractDto } from "../../common/dto/abstract.dto";

export class LoginDto extends AbstractDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
