import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { FileModule } from './modules/file/file.module';
import { ForumModule } from './modules/forum/forum.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

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
            // synchronize: true,
        }),
        ForumModule,
        EvaluationModule,
        TaskModule,
        FileModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
