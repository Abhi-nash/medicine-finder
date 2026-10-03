import { Module } from '@nestjs/common';
import { ShopMedicineController } from './shop-medicine.controller';
import { ShopMedicineService } from './shop-medicine.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ShopMedicineController],
  providers: [ShopMedicineService],
})
export class ShopMedicineModule {}
