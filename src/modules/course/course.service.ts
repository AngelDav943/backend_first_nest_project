import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseState } from 'src/modules/course/entities/course-state.entity';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
      @InjectRepository(CourseState)
      private courseStateRepository: Repository<CourseState>,

      @InjectRepository(Course)
      private courseRepository: Repository<Course>
  ) { }

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findAll() {
    return this.courseRepository.find({ relations:['state'] });
  }

  findOne(id: number) {
    return this.courseRepository.findOneBy({ id });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
