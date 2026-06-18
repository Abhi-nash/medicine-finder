export class CreateMedicineDto {
  name: string;
  manufacturer?: string;
  compositionIds: number[];
}