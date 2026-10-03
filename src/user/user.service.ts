import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        username: createUserDto.username,
        password: createUserDto.password,
      },
      select: this.publicFields,
    });
  }

  readonly publicFields = {
    id: true,
    name: true,
    username: true,
    role: true,
    pincode: true,
    shopId: true,
  } as const;

  async requireRole(userId: number, role: 'ADMIN' | 'SHOPKEEPER') {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: this.publicFields,
    });

    if (!user) {
      throw new NotFoundException(`User ${userId} was not found.`);
    }

    if (user.role !== role) {
      throw new ForbiddenException(`${role} access is required.`);
    }

    return user;
  }

  async deleteUser(adminId: number, userId: number, shopkeepersOnly = false) {
    await this.requireRole(adminId, 'ADMIN');
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User ${userId} was not found.`);
    }
    if (user.id === adminId) {
      throw new ForbiddenException('An admin cannot delete their own account.');
    }
    if (shopkeepersOnly && user.role !== 'SHOPKEEPER') {
      throw new ForbiddenException('The selected user is not a shopkeeper.');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.purchase.deleteMany({ where: { buyerId: user.id } });

      if (user.shopId) {
        await tx.purchase.deleteMany({
          where: { shopMedicine: { shopId: user.shopId } },
        });
        await tx.shopMedicine.deleteMany({ where: { shopId: user.shopId } });
        await tx.user.update({ where: { id: user.id }, data: { shopId: null } });
        await tx.shop.delete({ where: { id: user.shopId } });
      }

      await tx.user.delete({ where: { id: user.id } });
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      select: this.publicFields,
      orderBy: { id: 'asc' },
    });
  }
}
