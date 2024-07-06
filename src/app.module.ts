import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ForumModule } from './modules/forum/forum.module';
import { UserModule } from './modules/user/user.module';
import { CourseModule } from './modules/course/course.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'backend1',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ForumModule,
    EvaluationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
