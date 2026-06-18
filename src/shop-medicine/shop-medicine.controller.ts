import { Body, Controller, Post, Patch, Param } from '@nestjs/common';
import { ShopMedicineService } from './shop-medicine.service';
import { CreateShopMedicineDto } from './dto/create-shop-medicine.dto';
import { UpdateShopMedicineDto } from './dto/update-shop-medicine.dto';

@Controller('shop-medicine')
export class ShopMedicineController {
    constructor(private readonly shopMedicineService: ShopMedicineService) { }

    @Post()
    create(@Body() dto: CreateShopMedicineDto) {
        return this.shopMedicineService.create(dto);
    }
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateShopMedicineDto,
    ) {
        return this.shopMedicineService.update(Number(id), dto);
    }
}