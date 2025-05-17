import { IsDate, IsNotEmpty } from "class-validator";
import { AbstractDto } from "../../common/dto/abstract.dto";

export class TaskDto extends AbstractDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  status: string;
  userId: number;
  userName: string;
  createdAt: Date; 
}
