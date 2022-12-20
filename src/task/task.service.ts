import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NestjsWinstonLoggerService } from 'nestjs-winston-logger';
import { encryptResponse } from 'src/utils/encryption';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskRepository } from './tasks.repository';



@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    // private logger : NestjsWinstonLoggerService
  ){}
  create(createTaskDto: CreateTaskDto) {
    const { name } = createTaskDto;
    const task = new Task()
    task.name = name
     task.save()
    // return this.taskRepository.create(createTaskDto); // 'This action adds a new task';
  }

  findAll() {
    // this.logger.error('error plenty abeg'); 
    // this.logger.verbose('dddd')
    return this.taskRepository.find(); // `This action returns all task`;
  }
  
  encrypt(data){
    return encryptResponse(JSON.stringify(data));
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
