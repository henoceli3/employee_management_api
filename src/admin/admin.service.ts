import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntity } from './admin.entity/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
dotenv.config();

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
  ) {}

  async createAdmin(
    name: string,
    lastname: string,
    email: string,
    password: string,
  ) {
    try {
      const adminExist = await this.adminRepository.exists({
        where: { email: email },
      });
      if (adminExist) {
        throw new BadRequestException('Admin already exist');
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const admin = await this.adminRepository.save({
        uuid: uuidv4(),
        isActive: true,
        name: name,
        lastname: lastname,
        email: email,
        password: hashedPassword,
      });
      return {
        message: 'Admin created',
        data: {
          admin,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async login(email: string, password: string) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { email: email },
      });
      if (!admin) {
        throw new BadRequestException('Admin not found');
      }
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }
      const token = jwt.sign(
        { uuid: admin.uuid, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );
      return {
        message: 'Admin logged in',
        data: {
          uuid: admin.uuid,
          token: token,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getAdmin(uuid: string) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { uuid: uuid },
      });
      if (!admin) {
        throw new BadRequestException('Admin not found');
      }
      return {
        message: 'Admin found',
        data: {
          admin,
        },
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
