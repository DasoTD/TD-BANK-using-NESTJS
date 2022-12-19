
import { IsString, Length, Matches } from 'class-validator';


  
export class CreateTaskDto {
    @IsString()
  @Length(4, 20)
  name: string;
}
