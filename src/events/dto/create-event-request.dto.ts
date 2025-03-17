import { getConstant } from '@/constants/get-constant';
import { IsDateString, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEventRequestDto {
  @IsString({
    message: getConstant().EVENT.TITLE_MUST_BE_STRING,
  })
  title: string;

  @IsString({
    message: getConstant().EVENT.DESCRIPTION_MUST_BE_STRING,
  })
  description: string;

  @IsString({
    message: getConstant().EVENT.URL_MUST_BE_STRING,
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsString({
    message: getConstant().EVENT.ADDRESS_MUST_BE_STRING,
  })
  @IsOptional()
  address?: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;
}
