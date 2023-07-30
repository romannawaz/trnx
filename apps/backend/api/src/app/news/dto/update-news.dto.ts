import { IsNotEmpty, IsString } from 'class-validator';
import { UpdateNews } from '@trnx/news/common';

export class UpdateNewsDto implements UpdateNews {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;
}
