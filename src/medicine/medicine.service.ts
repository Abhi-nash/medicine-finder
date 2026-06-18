import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
  return this.prisma.medicine.findMany({
    include: {
      compositions: true,
    },
  });
}

   async createMedicine(dto: CreateMedicineDto) {
  const { name, manufacturer, compositionIds } = dto;

  return this.prisma.medicine.create({
    data: {
      name,
      manufacturer,
      compositions: {
        connect: compositionIds.map((id) => ({ id })),
      },
    },
    include: {
      compositions: true,
    },
  });
}
}