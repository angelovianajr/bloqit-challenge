import { IsNotEmpty } from "class-validator";

export class CreateBloqDto {
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  address: string;
}
