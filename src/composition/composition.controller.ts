import { Body, Controller, Post, Get } from '@nestjs/common';
import { CompositionService } from './composition.service';
import { CreateCompositionDto } from './dto/create-composition.dto';

@Controller('compositions')
export class CompositionController {
  constructor(private compositionService: CompositionService) {}

  @Post()
  create(@Body() createCompositionDto: CreateCompositionDto) {
    return this.compositionService.create(createCompositionDto);
  }
  @Get()
  findAll() {
    return this.compositionService.findAll();
  }
}