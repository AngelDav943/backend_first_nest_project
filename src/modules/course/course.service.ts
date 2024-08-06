import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateTeacherCourseDto } from './dto/create-teacher-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateTeacherCourseDto } from './dto/update-teacher-course.dto';
import { CourseState } from './entities/course-state.entity';
import { Course } from './entities/course.entity';
import { TeacherCourse } from './entities/teacher-course.entity';

/**
 *
 */
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

    /**
     *
     * @param createCourseDto
     */
    async create(createCourseDto: CreateCourseDto) {
        const createdCourse = await this.courseRepository.save(createCourseDto);
        return createdCourse.id;
    }

    /**
     *
     * @param createTeacherCourseDto
     */
    async createTeacherCourse(createTeacherCourseDto: CreateTeacherCourseDto) {
        const createdTeacherCourse = await this.teacherCourseRepository.save(
            createTeacherCourseDto,
        );
        return createdTeacherCourse.id;
    }

    /**
     *
     * @param where
     */
    findAll(where?: FindOptionsWhere<Course> | FindOptionsWhere<Course>[]) {
        return this.courseRepository.find({
            where,
            relations: {
                state: true,
                evaluations: true,
                forums: {
                    messages: true,
                },
            },
        });
    }

    /**
     *
     * @param id
     */
    findOne(id: number) {
        return this.courseRepository.findOne({
            where: { id },
            relations: ['state', 'evaluations', 'forums'],
        });
    }

    /**
     *
     * @param id
     * @param updateCourseDto
     */
    update(id: number, updateCourseDto: UpdateCourseDto) {
        return this.courseRepository.update(id, updateCourseDto);
    }

    /**
     *
     * @param id
     * @param updateTeacherCourseDto
     */
    updateTeacherCourse(
        id: number,
        updateTeacherCourseDto: UpdateTeacherCourseDto,
    ) {
        return this.teacherCourseRepository.update(id, updateTeacherCourseDto);
    }

    /**
     *
     * @param id
     */
    remove(id: number) {
        return this.courseRepository.delete(id);
    }

    /**
     *
     * @param id
     */
    removeTeacherCourse(id: number) {
        return this.teacherCourseRepository.delete(id);
    }

    /**
     *
     */
    findStates() {
        return this.courseStateRepository.find({
            relations: {
                courses: true,
            },
        });
    }

    /**
     *
     */
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

    /**
     *
     * @param id
     */
    findOneTeacherCourse(id: number) {
        return this.teacherCourseRepository.findOne({
            relations: ['course', 'teacher', 'students'],
            where: { id },
        });
    }
}
