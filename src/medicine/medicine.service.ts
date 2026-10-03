import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { buildCompositionKey } from './composition-key';

@Injectable()
export class MedicineService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.medicine.findMany({
      include: { compositions: true },
      orderBy: { brandName: 'asc' },
    });
  }

  suggest(query: string) {
    return this.prisma.medicine.findMany({
      where: { brandName: { contains: query.trim() } },
      select: {
        id: true,
        brandName: true,
        manufacturer: true,
        compositions: { select: { ingredientName: true, strength: true } },
      },
      take: 8,
      orderBy: { brandName: 'asc' },
    });
  }

  async createMedicine(dto: CreateMedicineDto) {
    const compositionKey = buildCompositionKey(dto.compositions);

    return this.prisma.medicine.create({
      data: {
        brandName: dto.brandName.trim(),
        manufacturer: dto.manufacturer?.trim(),
        compositionKey,
        compositions: {
          create: dto.compositions.map(({ ingredientName, strength }) => ({
            ingredientName: ingredientName.trim(),
            strength: strength.trim(),
          })),
        },
      },
      include: { compositions: true },
    });
  }

  async findOne(id: number) {
    const medicine = await this.prisma.medicine.findUnique({
      where: { id },
      include: { compositions: true },
    });

    if (!medicine) {
      throw new NotFoundException(`Medicine ${id} was not found.`);
    }

    return medicine;
  }

  async findEquivalents(id: number) {
    const medicine = await this.findOne(id);
    const equivalents = await this.prisma.medicine.findMany({
      where: {
        compositionKey: medicine.compositionKey,
        id: { not: medicine.id },
      },
      include: { compositions: true },
      orderBy: { brandName: 'asc' },
    });

    return { medicine, equivalents };
  }

  async findNearbyAvailability(id: number, pincode: string) {
    const medicine = await this.findOne(id);
    const matchingMedicines = await this.prisma.medicine.findMany({
      where: { compositionKey: medicine.compositionKey },
      select: { id: true },
    });
    const matchingMedicineIds = matchingMedicines.map(({ id: medicineId }) =>
      medicineId,
    );
    const inventory = await this.prisma.shopMedicine.findMany({
      where: {
        medicineId: { in: matchingMedicineIds },
        quantity: { gt: 0 },
        shop: { pincode },
      },
      include: {
        shop: true,
        medicine: { include: { compositions: true } },
      },
      orderBy: [{ medicineId: 'asc' }, { mrp: 'asc' }],
    });

    return {
      medicine,
      pincode,
      availability: inventory.map(({ medicine: stockedMedicine, ...stock }) => ({
        ...stock,
        medicine: stockedMedicine,
        isEquivalent: stockedMedicine.id !== medicine.id,
      })),
    };
  }
}
