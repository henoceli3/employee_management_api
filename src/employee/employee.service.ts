import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from './employee.entity/employee.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async createEmployee(
    email: string,
    nom: string,
    prenom: string,
    civilite: string,
    numero_de_telephone: string,
    type_contrat: string,
    photo: string,
  ) {
    try {
      const existEmployee = await this.employeeRepository.exists({
        where: { email: email },
      });
      if (existEmployee) {
        throw new BadRequestException('Employee already exist');
      }
      const employee = await this.employeeRepository.save({
        uuid: uuidv4(),
        isActive: true,
        email: email,
        nom: nom,
        prenom: prenom,
        civilite: civilite,
        numero_de_telephone: numero_de_telephone,
        type_contrat: type_contrat,
        photo: photo || 'default_avatar.jpg',
        createdAt: new Date(),
      });

      return {
        message: 'Employee created',
        data: {
          employee,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async updateEmployee(
    uuid: string,
    email: string,
    nom: string,
    prenom: string,
    civilite: string,
    numero_de_telephone: string,
    type_contrat: string,
  ) {
    try {
      const existEmployee = await this.employeeRepository.findOne({
        where: { uuid: uuid },
      });
      if (!existEmployee) {
        throw new BadRequestException('Employee not found');
      }
      const updatedEmployee = await this.employeeRepository.update(
        {
          uuid: uuid,
        },
        {
          email: email,
          nom: nom,
          prenom: prenom,
          civilite: civilite,
          numero_de_telephone: numero_de_telephone,
          type_contrat: type_contrat,
          updatedAt: new Date(),
        },
      );

      return {
        message: 'Employee updated',
        data: {
          updatedEmployee,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  // Service
  async updateEmployeePhoto(uuid: string, photoPath: string) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { uuid: uuid },
      });
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      employee.photo = photoPath; // Stockez le chemin complet du fichier dans la base de données
      employee.updatedAt = new Date();
      await this.employeeRepository.save(employee);
      return {
        message: 'Employee photo updated',
        data: {
          employee,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async disableEmployee(uuid: string) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { uuid: uuid },
      });
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      employee.isActive = false;
      employee.deletedAt = new Date();
      await this.employeeRepository.save(employee);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async enableEmployee(uuid: string) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { uuid: uuid },
      });
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      employee.isActive = true;
      employee.deletedAt = null;
      await this.employeeRepository.save(employee);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async permanentlyDelete(uuid: string) {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { uuid: uuid },
      });
      if (!employee) {
        throw new BadRequestException('Employee not found');
      }
      await this.employeeRepository.remove(employee);
      return {
        message: 'Employee permanently deleted',
        data: {},
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getAllEmployees() {
    try {
      const employees = await this.employeeRepository.find({
        order: { createdAt: 'DESC' },
      });
      return {
        message: 'Employees found',
        data: {
          employees,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
