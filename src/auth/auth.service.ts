import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if(user) {
      throw new HttpException(
        `User with this email already registered`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.userService.createUser({ ...userDto, password: hashPassword });
    return this.generateToken(newUser);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      id: user.id, roles:
      user.roles
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

 private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Invalid credentials',
    });
 }
}
