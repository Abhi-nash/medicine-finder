import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';

@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateShopDto) {
  const user = await this.prisma.user.findUnique({
    where: {
      id: dto.userId,
    },
  });

  if (!user) {
    throw  new NotFoundException('User does not exist');
  }

  const shop = await this.prisma.shop.create({
    data: {
      shopName: dto.shopName,
      contactNumber: dto.contactNumber,
      pincode: dto.pincode,
    },
  });

  await this.prisma.user.update({
    where: {
      id: dto.userId,
    },
    data: {
      shopId: shop.id,
    },
  });

  return shop;
}
async getShop(id: number) {
  return this.prisma.shop.findUnique({
    where: {
      id,
    },
     include: {
      medicines: true,
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
  });
}
async getAll() {
  return this.prisma.shop.findMany({
     include: {
      medicines: true,
      user: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
    },
  });
}
async getMedicines(shopId: number) {
  const shop = await this.prisma.shop.findUnique({
    where: {
      id: shopId,
    },
  });

  if (!shop) {
    throw new NotFoundException('Shop does not exist');
  }

  return this.prisma.shopMedicine.findMany({
    where: {
      shopId,
    },
    include: {
      medicine: true,
    },
  });
}
}