import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { TaskModule } from './tasks/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [   
    DatabaseModule,
    UserModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
