import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private rolesService: RolesService
  ) { }

  @ApiOperation({ summary: 'Create Role' })
  @ApiResponse({ status: 200, type: Roles })
  @Post()
  createRole(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: 'Get role by value'})
  @ApiResponse({ status: 200, type: Roles })
  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
