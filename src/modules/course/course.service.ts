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
     * Creates a new course
     * @param createCourseDto Information of the new course
     * @returns Returns the id of the newly created course
     */
    async create(createCourseDto: CreateCourseDto) {
        const createdCourse = await this.courseRepository.save(createCourseDto);
        return createdCourse.id;
    }

    /**
     * Creates an new teacher course
     * @param createTeacherCourseDto Information of the new teacher course
     * @returns Returns the id of the new teacher course
     */
    async createTeacherCourse(createTeacherCourseDto: CreateTeacherCourseDto) {
        const createdTeacherCourse = await this.teacherCourseRepository.save(
            createTeacherCourseDto,
        );
        return createdTeacherCourse.id;
    }

    /**
     * Finds all the courses that matches the request
     * @param where Request query
     * @returns A list of the courses that matches the request
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
     * Finds a specific course
     * @param id Course to find
     * @returns A course
     */
    findOne(id: number) {
        return this.courseRepository.findOne({
            where: { id },
            relations: ['state', 'evaluations', 'forums'],
        });
    }

    /**
     * Updates an existing course
     * @param id Course to update
     * @param updateCourseDto Information to update
     * @returns A result that indicates if the update was successful
     */
    update(id: number, updateCourseDto: UpdateCourseDto) {
        return this.courseRepository.update(id, updateCourseDto);
    }

    /**
     * Updates a teacher course
     * @param id Teacher course to update
     * @param updateTeacherCourseDto Information to update
     * @returns A result that indicates if the update was successful
     */
    updateTeacherCourse(
        id: number,
        updateTeacherCourseDto: UpdateTeacherCourseDto,
    ) {
        return this.teacherCourseRepository.update(id, updateTeacherCourseDto);
    }

    /**
     * Removes a course
     * @param id Course to remove
     * @returns A result indicating if the remove was successfull
     */
    remove(id: number) {
        return this.courseRepository.delete(id);
    }

    /**
     * Removes a teacher course
     * @param id Teacher course to remove
     * @returns A result indicating if the remove was successfull
     */
    removeTeacherCourse(id: number) {
        return this.teacherCourseRepository.delete(id);
    }

    /**
     * Finds all the states of a course
     * @returns A list of states
     */
    findStates() {
        return this.courseStateRepository.find({
            relations: {
                courses: true,
            },
        });
    }

    /**
     * Finds all the teacher courses
     * @returns A list of teacher courses
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
     * Finds a specific teacher course
     * @param id Teacher course to find
     * @returns A list of teacher courses
     */
    findOneTeacherCourse(id: number) {
        return this.teacherCourseRepository.findOne({
            relations: ['course', 'teacher', 'students'],
            where: { id },
        });
    }
}
