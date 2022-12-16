import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userPository: Repository<User>,
    // private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // signUp(createAuthDto: CreateAuthDto): Promise<User> {
  //   return this.userPository.createUser(createAuthDto); // 'This action adds a new auth';
  // }
  signIn(createAuthDto: CreateAuthDto){

  }
  async createAuth(createAuthDto: CreateAuthDto) {
    // const { username, password} = createAuthDto;
    const task = await this.userPository.create(createAuthDto);
    // await this.userPository.save(task);
    return task;
     
    // const auth = await this.userPository.createUser(createAuthDto);
    // return auth;
    // return 'This action adds a new auth';
  }

  findAll() {
    return  `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
