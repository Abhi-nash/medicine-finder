import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PurchaseService } from './purchase.service';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('buy')
  buy(@Body() dto: CreatePurchaseDto) {
    return this.purchaseService.buy(dto);
  }

  @Get('purchases/user/:buyerId')
  findByBuyer(@Param('buyerId', ParseIntPipe) buyerId: number) {
    return this.purchaseService.findByBuyer(buyerId);
  }
}
