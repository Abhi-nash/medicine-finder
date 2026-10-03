import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsIn(['ADMIN', 'SHOPKEEPER', 'CUSTOMER'])
  role: 'ADMIN' | 'SHOPKEEPER' | 'CUSTOMER';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  pincode?: string;
}
