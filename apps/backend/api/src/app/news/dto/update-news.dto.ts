import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNewsDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
