import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { buildCompositionKey } from '../medicine/composition-key';

@Injectable()
export class CompositionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCompositionDto) {
    return this.prisma.$transaction(async (tx) => {
      const medicine = await tx.medicine.findUnique({
        where: { id: dto.medicineId },
      });

      if (!medicine) {
        throw new NotFoundException(`Medicine ${dto.medicineId} was not found.`);
      }

      const composition = await tx.composition.create({
        data: {
          medicineId: dto.medicineId,
          ingredientName: dto.ingredientName.trim(),
          strength: dto.strength.trim(),
        },
      });
      const compositions = await tx.composition.findMany({
        where: { medicineId: dto.medicineId },
      });

      await tx.medicine.update({
        where: { id: dto.medicineId },
        data: { compositionKey: buildCompositionKey(compositions) },
      });

      return composition;
    });
  }

  findAll() {
    return this.prisma.composition.findMany({ include: { medicine: true } });
  }
}
