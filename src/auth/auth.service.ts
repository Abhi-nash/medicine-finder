import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly publicFields = {
    id: true,
    name: true,
    username: true,
    role: true,
    pincode: true,
    shopId: true,
  } as const;

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { username: dto.username.trim() },
    });

    if (existing) {
      throw new ConflictException('That username is already in use.');
    }

    return this.prisma.user.create({
      data: {
        name: dto.name.trim(),
        username: dto.username.trim(),
        password: dto.password,
        role: dto.role,
        pincode: dto.pincode?.trim(),
      },
      select: this.publicFields,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username.trim() },
    });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException('Invalid username or password.');
    }
    if (user.role !== dto.role) {
      throw new ForbiddenException('This account does not have the selected role.');
    }
    if (dto.role === 'CUSTOMER' && !dto.pincode?.trim()) {
      throw new ForbiddenException('A pincode is required for customer login.');
    }

    if (dto.role === 'CUSTOMER' && dto.pincode?.trim()) {
      return this.prisma.user.update({
        where: { id: user.id },
        data: { pincode: dto.pincode.trim() },
        select: this.publicFields,
      });
    }

    const { password: _password, ...publicUser } = user;
    return publicUser;
  }
}
