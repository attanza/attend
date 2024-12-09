import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nik: string;

  @IsNotEmpty()
  password: string;

  @IsLatitude()
  lat: string;

  @IsLongitude()
  long: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
