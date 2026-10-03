import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAll(@Query('adminId', ParseIntPipe) adminId: number) {
    await this.userService.requireRole(adminId, 'ADMIN');
    return this.userService.findAll();
  }

  @Delete('users/:id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('adminId', ParseIntPipe) adminId: number,
  ) {
    return this.userService.deleteUser(adminId, id);
  }

  @Delete('shopkeepers/:id')
  deleteShopkeeper(
    @Param('id', ParseIntPipe) id: number,
    @Query('adminId', ParseIntPipe) adminId: number,
  ) {
    return this.userService.deleteUser(adminId, id, true);
  }
}
