import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('create')
  @HttpCode(200)
  async createEmployee(
    @Body('email') email: string,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('civilite') civilite: string,
    @Body('numero_de_telephone') numero_de_telephone: string,
    @Body('type_contrat') type_contrat: string,
    @Body('photo') photo: string,
  ) {
    return await this.employeeService.createEmployee(
      email,
      nom,
      prenom,
      civilite,
      numero_de_telephone,
      type_contrat,
      photo,
    );
  }

  @Post('update')
  @HttpCode(200)
  async updateEmployee(
    @Body('uuid') uuid: string,
    @Body('email') email: string,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('civilite') civilite: string,
    @Body('numero_de_telephone') numero_de_telephone: string,
    @Body('type_contrat') type_contrat: string,
  ) {
    return await this.employeeService.updateEmployee(
      uuid,
      email,
      nom,
      prenom,
      civilite,
      numero_de_telephone,
      type_contrat,
    );
  }

  // Contrôleur
  @Post('update/photo')
  @HttpCode(200)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${extname(file.originalname)}`;
          return cb(null, filename);
        },
      }),
    }),
  )
  async updateEmployeePhoto(
    @Body('uuid') uuid: string,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return await this.employeeService.updateEmployeePhoto(uuid, photo.filename);
  }

  @Post('disable')
  @HttpCode(200)
  async disableEmployee(@Body('uuid') uuid: string) {
    return await this.employeeService.disableEmployee(uuid);
  }

  @Post('enable')
  @HttpCode(200)
  async enableEmployee(@Body('uuid') uuid: string) {
    return await this.employeeService.enableEmployee(uuid);
  }

  @Post('delete')
  @HttpCode(200)
  async permanentlyDelete(@Body('uuid') uuid: string) {
    return await this.employeeService.permanentlyDelete(uuid);
  }

  @Get('getEmployees')
  @HttpCode(200)
  async getAllEmployees() {
    return await this.employeeService.getAllEmployees();
  }
}
