import { Body, Controller, Post, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UserService } from '../user/user.service';

@Controller('compositions')
export class CompositionController {
  constructor(
    private compositionService: CompositionService,
    private userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() createCompositionDto: CreateCompositionDto,
    @Query('adminId', ParseIntPipe) adminId: number,
  ) {
    await this.userService.requireRole(adminId, 'ADMIN');
    return this.compositionService.create(createCompositionDto);
  }
  @Get()
  findAll() {
    return this.compositionService.findAll();
  }
}
