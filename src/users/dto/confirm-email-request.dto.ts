import { IsString } from 'class-validator';

export class ConfirmEmailRequestDto {
  @IsString()
  confirmCode: string;
}
