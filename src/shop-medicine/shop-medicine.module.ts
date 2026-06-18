import { Module } from '@nestjs/common';
import { ShopMedicineController } from './shop-medicine.controller';
import { ShopMedicineService } from './shop-medicine.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShopMedicineController],
  providers: [ShopMedicineService],
})
export class ShopMedicineModule {}