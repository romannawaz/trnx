import { IsNotEmpty, IsString } from 'class-validator';
import { CreateNews } from '@trnx/news/common';

export class CreateNewsDto implements CreateNews {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
}
