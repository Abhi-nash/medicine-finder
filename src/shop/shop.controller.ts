import { Body, Controller, Post, Get, Param, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() dto: CreateShopDto) {
    return this.shopService.create(dto);
  }
  @Get(':id')
  getShop(@Param('id') id: string) {
    return this.shopService.getShop(Number(id));
  }
  @Get()
  getAll(@Query('pincode') pincode?: string) {
    return this.shopService.getAll(pincode?.trim());
  }
  @Get(':id/medicines')
getMedicines(@Param('id') id: string) {
  return this.shopService.getMedicines(Number(id));
}
  
}
