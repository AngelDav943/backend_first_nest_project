import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseState } from './entities/course-state.entity';
import { Course } from './entities/course.entity';
import { TeacherCourse } from './entities/teacher-course.entity';

@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseState)
    private courseStateRepository: Repository<CourseState>,
    @InjectRepository(TeacherCourse)
    private teacherCourseRepository: Repository<TeacherCourse>,
  ) { }

  create(createCourseDto: CreateCourseDto) {
    return this.courseRepository.save(createCourseDto);
  }

  findAll() {
    return this.courseRepository.find({
      // relations: ['state', 'evaluations', 'forums']
      relations: {
        state: true,
        evaluations: true,
        forums: {
          messages: true
        }
      }
    });
  }

  findOne(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['state', 'evaluations', 'forums']
    })
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }

  findStates() {
    return this.courseStateRepository.find({
      relations: ['course', 'state']
    });
  }

  findTeacherCourses() {
    return this.teacherCourseRepository.find({
      relations: ['course', 'teacher', 'students']
    });
  }

  findOneTeacherCourse(id: number) {
    return this.teacherCourseRepository.findOne({
      relations: ['course', 'teacher', 'students'],
      where: { id }
    });
  }
}