import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create')
  @HttpCode(201)
  async createAdmin(
    @Body('name') name: string,
    @Body('lastname') lastname: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.adminService.createAdmin(name, lastname, email, password);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.adminService.login(email, password);
  }

  @Post('getAdmin')
  @HttpCode(200)
  async getAdmin(@Body('uuid') uuid: string) {
    return await this.adminService.getAdmin(uuid);
  }
}
