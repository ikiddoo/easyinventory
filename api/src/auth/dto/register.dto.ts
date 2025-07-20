import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}