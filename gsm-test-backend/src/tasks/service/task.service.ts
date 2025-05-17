
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractService } from '../../common/service/abstract.service';
import { Task } from '../entity/task.entity';
import { TaskDto } from '../dto/task.dto';
import { UpdateTaskDto } from '../dto/update.task';
import { User } from 'src/user/entity/user.entity';


@Injectable()
export class TaskService extends AbstractService<TaskDto, Task> {

  constructor(
    @InjectRepository(Task) readonly taskRepository: Repository<Task>) {
    super(taskRepository);
  }


  // async createTask(userId: number, dto: TaskDto): Promise<TaskDto> {
  //   const user = new User();
  //   user.id = userId;
  //   dto.
  //   return this.save(dto);
  // }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<TaskDto> {
    const taskDto = await this.findById(id);
    if (!taskDto) {
      throw Error('Task not found!');
    }

    taskDto.title = dto.title;
    taskDto.status = dto.status;

    return this.save(taskDto);
  }

  async findByStatusAdnUser(status: string | undefined, userId: number): Promise<TaskDto[]> {
    const result = new Array<TaskDto>();


    // const listt = await this.taskRepository
    //   .createQueryBuilder('task').select('task.*, "user".name AS "userName"')
    //   .where('task.status = :status AND task.userId = :userId', { status, userId })
    //   .leftJoin(User, "user", "task.userId = user.id")
    //   .getRawMany();

    // const list = await this.taskRepository
    //   .createQueryBuilder('task').select('task.*, "user".name AS "userName"')
    //   .where('task.status = :status AND task.userId = :userId', { status, userId })
    //   .leftJoin(User, "user", "task.userId = user.id")
    //   .getRawMany();


    // console.log(listt);
    const user = new User();
    user.id = userId;

    const params = status ?  {status: status, user: user} : {user: user};
    const list = await this.taskRepository.findBy(params);
    for (const e of list) {
      const d = await this.toDto(e);
      result.push(d);
    }
    return result;
  }

  async toDto(enity: Task): Promise<TaskDto> {
    const result = new TaskDto();
    Object.assign(result, enity);
    result.userId = enity.user?.id;
    result.userName = enity.user?.name;
    return result;
  }

  async toEntity(dto: TaskDto): Promise<Task> {
    const result = new Task();
    const user = new User();
    user.id = dto.userId;
    result.user = user;    
    Object.assign(result, dto);
    return result;
  }

}
