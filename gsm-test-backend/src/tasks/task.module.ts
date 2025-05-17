import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskController } from '../tasks/controller/task.controller';
import { TaskService } from '../tasks/service/task.service';
import { Task } from '../tasks/entity/task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),    
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {

}
