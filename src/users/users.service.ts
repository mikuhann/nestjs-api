import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Roles } from '../roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: Roles,
        attributes: ['value']
      },
    });

    return users;
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new HttpException(
        `Enter email address`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({
      where: { email },
      include: {
        model: Roles,
        attributes: ['value'],
      },
    });

    return user;
  }
}
