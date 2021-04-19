import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'USER', description: 'User role' })
  readonly value: string;

  @ApiProperty({ example: 'Description for USER role', description: 'Description for role' })
  readonly description: string;
}