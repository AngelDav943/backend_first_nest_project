import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseState } from './entities/course-state.entity';
import { Course } from './entities/course.entity';
import { TeacherCourse } from './entities/teacher-course.entity';
import { CreateTeacherCourseDto } from './dto/create-teacher-course.dto';
import { UpdateTeacherCourseDto } from './dto/update-teacher-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseState)
    private courseStateRepository: Repository<CourseState>,
    @InjectRepository(TeacherCourse)
    private teacherCourseRepository: Repository<TeacherCourse>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const createdCourse = await this.courseRepository.save(createCourseDto);
    return createdCourse.id;
  }

  async createTeacherCourse(createTeacherCourseDto: CreateTeacherCourseDto) {
    const createdTeacherCourse = await this.teacherCourseRepository.save(
      createTeacherCourseDto,
    );
    return createdTeacherCourse.id;
  }

  findAll() {
    return this.courseRepository.find({
      // relations: ['state', 'evaluations', 'forums']
      relations: {
        state: true,
        evaluations: true,
        forums: {
          messages: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.courseRepository.findOne({
      where: { id },
      relations: ['state', 'evaluations', 'forums'],
    });
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  updateTeacherCourse(
    id: number,
    updateTeacherCourseDto: UpdateTeacherCourseDto,
  ) {
    return this.teacherCourseRepository.update(id, updateTeacherCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }

  removeTeacherCourse(id: number) {
    return this.teacherCourseRepository.delete(id);
  }

  findStates() {
    return this.courseStateRepository.find({
      relations: {
        courses: true,
      },
    });
  }

  findTeacherCourses() {
    return this.teacherCourseRepository.find({
      relations: {
        course: true,
        teacher: {
          usertype: true,
        },
        students: {
          usertype: true,
        },
      },
    });
  }

  findOneTeacherCourse(id: number) {
    return this.teacherCourseRepository.findOne({
      relations: ['course', 'teacher', 'students'],
      where: { id },
    });
  }
}
