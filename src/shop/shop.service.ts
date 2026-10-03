import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ShopService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async create(dto: CreateShopDto) {
  const shopkeeper = await this.userService.requireRole(dto.userId, 'SHOPKEEPER');
  if (shopkeeper.shopId) {
    throw new Error('This shopkeeper already owns a shop.');
  }
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
async getAll(pincode?: string) {
  return this.prisma.shop.findMany({
    where: pincode ? { pincode } : undefined,
    include: {
      medicines: {
        where: { quantity: { gt: 0 } },
        include: { medicine: true },
      },
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
