import { Body, Controller, Post, Get } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Controller('medicines')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  createMedicine(@Body() dto: CreateMedicineDto) {
    return this.medicineService.createMedicine(dto);
  }

@Get()
findAll() {
  return this.medicineService.findAll();
}
}