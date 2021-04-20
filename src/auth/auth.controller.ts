import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from '../users/users.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: User })
  @Post('/login')
  login(@Body() userDto: CreateUserDto ) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'User registration'})
  @ApiResponse({ status: 200, type: User })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
