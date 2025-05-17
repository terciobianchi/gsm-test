import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AbstractController } from '../../common/controller/abstract.controller';
import { UserService } from '../service/user.service';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController extends AbstractController {
  
  constructor(private readonly userService: UserService) { super(); }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<UserDto | undefined> {
    try {
      const result = await this.userService.register(userDto);
      return result;      
    } catch (error) {
      await this.handleException(error);
    }
  }  

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any | undefined> {
    try {
      const result = await this.userService.login(loginDto);
      return result;      
    } catch (error) {
      await this.handleException(error);
    }
  }    

}
