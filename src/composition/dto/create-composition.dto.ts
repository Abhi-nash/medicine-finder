import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCompositionDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  medicineId: number;

  @IsString()
  @IsNotEmpty()
  ingredientName: string;

  @IsString()
  @IsNotEmpty()
  strength: string;
}
