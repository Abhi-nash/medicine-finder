import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MedicineIngredientDto {
  @IsString()
  @IsNotEmpty()
  ingredientName: string;

  @IsString()
  @IsNotEmpty()
  strength: string;
}

export class CreateMedicineDto {
  @IsString()
  @IsNotEmpty()
  brandName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  manufacturer?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => MedicineIngredientDto)
  compositions: MedicineIngredientDto[];
}
