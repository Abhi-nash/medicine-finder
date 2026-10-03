import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async buy(dto: CreatePurchaseDto) {
    return this.prisma.$transaction(async (tx) => {
      const buyer = await tx.user.findUnique({ where: { id: dto.buyerId } });

      if (!buyer) {
        throw new NotFoundException(`User ${dto.buyerId} was not found.`);
      }

      const stock = await tx.shopMedicine.findUnique({
        where: { id: dto.shopMedicineId },
        include: { medicine: true, shop: true },
      });

      if (!stock) {
        throw new NotFoundException(
          `Shop medicine ${dto.shopMedicineId} was not found.`,
        );
      }

      const updated = await tx.shopMedicine.updateMany({
        where: { id: stock.id, quantity: { gte: dto.quantity } },
        data: { quantity: { decrement: dto.quantity } },
      });

      if (updated.count !== 1) {
        throw new BadRequestException('This medicine does not have enough stock.');
      }

      return tx.purchase.create({
        data: {
          buyerId: buyer.id,
          shopMedicineId: stock.id,
          quantity: dto.quantity,
          unitPrice: stock.mrp,
          totalPrice: stock.mrp * dto.quantity,
        },
        include: {
          shopMedicine: { include: { medicine: true, shop: true } },
        },
      });
    });
  }

  findByBuyer(buyerId: number) {
    return this.prisma.purchase.findMany({
      where: { buyerId },
      include: {
        shopMedicine: { include: { medicine: true, shop: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
