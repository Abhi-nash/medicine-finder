import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopMedicineDto } from './dto/create-shop-medicine.dto';
import { UpdateShopMedicineDto } from './dto/update-shop-medicine.dto';

@Injectable()
export class ShopMedicineService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateShopMedicineDto) {
    const shop = await this.prisma.shop.findUnique({
      where: {
        id: dto.shopId,
      },
    });

    if (!shop) {
      throw new NotFoundException('Shop does not exist');
    }

    const medicine = await this.prisma.medicine.findUnique({
      where: {
        id: dto.medicineId,
      },
    });

    if (!medicine) {
      throw new NotFoundException('Medicine does not exist');
    }

    const existing = await this.prisma.shopMedicine.findFirst({
      where: {
        shopId: dto.shopId,
        medicineId: dto.medicineId,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'Medicine already exists in this shop',
      );
    }

    return this.prisma.shopMedicine.create({
      data: {
        shopId: dto.shopId,
        medicineId: dto.medicineId,
        mrp: dto.mrp,
        quantity: dto.quantity,
      },
    });
  }
  async update(id: number, dto: UpdateShopMedicineDto) {
  const shopMedicine = await this.prisma.shopMedicine.findUnique({
    where: {
      id,
    },
  });

  if (!shopMedicine) {
    throw new NotFoundException('Shop medicine not found');
  }

  return this.prisma.shopMedicine.update({
    where: {
      id,
    },
    data: {
      mrp: dto.mrp,
      quantity: dto.quantity,
    },
  });
}
}