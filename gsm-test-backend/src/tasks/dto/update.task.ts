import { IsNotEmpty } from "class-validator";
import { AbstractDto } from "../../common/dto/abstract.dto";

export class UpdateTaskDto extends AbstractDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  status: string;
}
