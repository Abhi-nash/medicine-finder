import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompositionDto } from './dto/create-composition.dto';

@Injectable()
export class CompositionService {
  constructor(private prisma: PrismaService) {}

  create(dto: { name: string; strength: string }) {
  return this.prisma.composition.upsert({
    where: {
      name_strength: {
        name: dto.name,
        strength: dto.strength,
      },
    },
    update: {}, // do nothing if exists
    create: dto,
  });
}
  findAll() {
  return this.prisma.composition.findMany();
}
}