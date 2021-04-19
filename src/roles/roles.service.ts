import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './roles.model';
import { InjectModel } from '@nestjs/sequelize'

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles) private roles: typeof Roles
  ) { }

  async createRole(dto: CreateRoleDto) {
    const role = await this.roles.create(dto)

    return role;
  }

  async getRoleByValue(value: string) {
    const role = await this.roles.findOne({ where: { value } });

    return role;
  }
}
