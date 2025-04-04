import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingService } from '@/libs/hashing';
import { User } from '@/users/entity/user.entity';
import { UsersRepository } from '@/users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, HashingService],
  exports: [UsersRepository],
})
export class UsersModule {}
