import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Course } from 'src/modules/course/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseState } from './entities/course-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseState])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
