import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@config/typeorm';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...dataSourceOptions,
      }),
    }),
    UsersModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
