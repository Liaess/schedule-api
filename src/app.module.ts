import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@/src/users/users.module';
import { dataSourceOptions } from '@config/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
      }),
    }),
    UsersModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
