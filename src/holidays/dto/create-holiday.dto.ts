import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateHolidayDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsOptional()
  @MaxLength(255)
  description: string;
}
