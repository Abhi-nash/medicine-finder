import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UserService } from '../user/user.service';

@Controller()
export class MedicineController {
  constructor(
    private readonly medicineService: MedicineService,
    private readonly userService: UserService,
  ) {}

  @Post('medicine')
  async createMedicine(
    @Body() dto: CreateMedicineDto,
    @Query('adminId', ParseIntPipe) adminId: number,
  ) {
    await this.userService.requireRole(adminId, 'ADMIN');
    return this.medicineService.createMedicine(dto);
  }

  @Get('medicine')
  findAll() {
    return this.medicineService.findAll();
  }

  @Get('medicine/suggestions')
  suggest(@Query('q') query = '') {
    return this.medicineService.suggest(query);
  }

  @Get('medicine/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicineService.findOne(id);
  }

  @Get('medicine/:id/nearby')
  findNearbyAvailability(
    @Param('id', ParseIntPipe) id: number,
    @Query('pincode') pincode?: string,
  ) {
    if (!pincode?.trim()) {
      throw new BadRequestException('pincode is required.');
    }

    return this.medicineService.findNearbyAvailability(id, pincode.trim());
  }

  @Get('equivalents/:id')
  findEquivalents(@Param('id', ParseIntPipe) id: number) {
    return this.medicineService.findEquivalents(id);
  }
}
