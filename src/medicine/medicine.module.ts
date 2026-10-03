import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';

@Module({
   imports: [PrismaModule, UserModule],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
