import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreatePurchaseDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  buyerId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopMedicineId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  quantity: number;
}
