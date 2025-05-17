
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AbstractService } from '../../common/service/abstract.service';
import { constants } from '../../common/constants';
import { User } from '../entity/user.entity';
import { UserDto } from '../dto/user.dto';
import { LoginDto } from '../dto/login.dto';


@Injectable()
export class UserService extends AbstractService<UserDto, User> {

  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
    private jwtService: JwtService) {
    super(userRepository);
  }

  async register(dto: UserDto): Promise<UserDto> {
    const check = await this.findByUsername(dto.username);
    if (check) {
      throw Error('User already exists!');
    }

    if (!dto.password) {
      throw Error('Invalid password!');
    }

    const salt = bcrypt.genSaltSync(constants.saltRounds);
    const hash = bcrypt.hashSync(dto.password, salt);
    dto.id = null;
    dto.password = hash;
    const result = await this.save(dto);
    result.password = null;
    return result;
  }

  async login(loginDto: LoginDto): Promise<any | undefined> {
    const dto = await this.findByUsername(loginDto.username);
    if (!dto) {
      throw Error('Invalid usernamer or password!');
    }

    const isMatch = bcrypt.compareSync(loginDto.password || '', dto.password || '');
    if (!isMatch) {
      throw Error('Invalid usernamer or password!');
    }

    const payload = { sub: dto.id, name: dto.name, username: dto.username };
    return {
      user: dto,
      accessToken: await this.jwtService.signAsync(payload)
    };
  }

  async findByUsername(username: string): Promise<UserDto | undefined> {
    const entity = await this.userRepository.findOneBy({ username: username });
    if (entity !== null) {
      const result = await this.toDto(entity);
      return result;
    }
    return undefined;
  }

  async toDto(enity: User): Promise<UserDto> {
    const result = new UserDto();
    Object.assign(result, enity);
    return result;
  }

  async toEntity(dto: UserDto): Promise<User> {
    const result = new User();
    Object.assign(result, dto);
    return result;
  }

}
