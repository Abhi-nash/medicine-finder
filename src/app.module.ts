import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CompositionModule } from './composition/composition.module';
import { MedicineModule } from './medicine/medicine.module';
import { ShopModule } from './shop/shop.module';
import { ShopMedicineModule } from './shop-medicine/shop-medicine.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [
    UserModule,
    PrismaModule,
    CompositionModule,
    MedicineModule,
    ShopModule,
    ShopMedicineModule,
    PurchaseModule,
    AuthModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
