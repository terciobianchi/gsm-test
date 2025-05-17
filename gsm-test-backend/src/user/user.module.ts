import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { constants } from '../common/constants';
import { AuthController } from './controller/auth.controller';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),    
    JwtModule.register({
          global: true,
          secret: constants.jwtSecret,
          signOptions: { expiresIn: '60m' },
        }),    
  ],
  controllers: [AuthController],
  providers: [UserService],
})
export class UserModule {

}
