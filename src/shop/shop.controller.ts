import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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
  getAll(){
    return this.shopService.getAll();
  }
  @Get(':id/medicines')
getMedicines(@Param('id') id: string) {
  return this.shopService.getMedicines(Number(id));
}
  
}