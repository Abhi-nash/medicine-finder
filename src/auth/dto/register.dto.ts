import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsIn(['SHOPKEEPER', 'CUSTOMER'])
  role: 'SHOPKEEPER' | 'CUSTOMER';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pincode?: string;
}
