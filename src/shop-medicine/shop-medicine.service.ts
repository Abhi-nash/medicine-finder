import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopMedicineDto } from './dto/create-shop-medicine.dto';
import { UpdateShopMedicineDto } from './dto/update-shop-medicine.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ShopMedicineService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(dto: CreateShopMedicineDto) {
    const shopkeeper = await this.userService.requireRole(
      dto.shopkeeperId,
      'SHOPKEEPER',
    );
    if (shopkeeper.shopId !== dto.shopId) {
      throw new BadRequestException('You can only manage your own shop inventory.');
    }
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

  const shopkeeper = await this.userService.requireRole(
    dto.shopkeeperId,
    'SHOPKEEPER',
  );
  if (shopkeeper.shopId !== shopMedicine.shopId) {
    throw new BadRequestException('You can only manage your own shop inventory.');
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
