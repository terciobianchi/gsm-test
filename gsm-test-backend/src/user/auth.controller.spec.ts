import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './controller/auth.controller';
import { DatabaseModule } from '../database.module';
import { UserModule } from './user.module';
import { UserDto } from './dto/user.dto';


describe('AuthController', () => {
  let userController: AuthController;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UserModule
      ],      
      controllers: [],
      providers: [],
    }).compile();

    userController = user.get<AuthController>(AuthController);
  });

  describe('TEST /register endpoints', () => {
    it('should return 1 user with id', async () => {
      const user = new UserDto();
      user.name = "User Teste";
      user.username = "terciobianchi@gmail.com";
      user.password = "mg123456789";
      const result = await userController.register(user);
      expect(result).not.toEqual(undefined);
    });    
    // it('should return 2 records', async () => {
    //   const result = await userController.findAll();
    //   expect(result).not.toEqual(undefined);
    //   expect(result?.length).toBeGreaterThan(0);
    // });  
  });
});
