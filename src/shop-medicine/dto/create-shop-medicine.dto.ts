import { Type } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

export class CreateShopMedicineDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopkeeperId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  shopId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  medicineId: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  mrp: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  quantity: number;
}
