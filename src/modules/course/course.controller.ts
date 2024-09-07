import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthTokenPayloadValidateInfo } from '../auth/dto/login.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateTeacherCourseDto } from './dto/create-teacher-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateTeacherCourseDto } from './dto/update-teacher-course.dto';

/**
 *
 */
@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    /**
     * Creates a new course
     * @param createCourseDto Information of the new course
     * @returns Returns the id of the newly created course
     */
    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.create(createCourseDto);
    }

    /**
     * Creates an new teacher course
     * @param createTeacherCourseDto Information of the new teacher course
     * @returns Returns the id of the new teacher course
     */
    @Post('teacherCourses')
    createTeacherCourse(
        @Body() createTeacherCourseDto: CreateTeacherCourseDto,
    ) {
        return this.courseService.createTeacherCourse(createTeacherCourseDto);
    }

    /**
     * Finds all the courses
     * @returns A list of the courses
     */
    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.courseService.findAll();
    }

    /**
     * Finds all the courses that the user has joined
     * @param request http request
     * @returns A list of the courses
     */
    @Get('joined')
    @UseGuards(AuthGuard)
    userCourses(@Req() request: Request) {
        const info = request.user['info'] as AuthTokenPayloadValidateInfo;
        return this.courseService.findAllTeacherCourses({
            students: { id: info.id },
        });
    }

    /**
     * Finds all the states of a course
     * @returns A list of states
     */
    @Get('states')
    findStates() {
        return this.courseService.findStates();
    }

    /**
     * Finds all the teacher courses
     * @returns A list of teacher courses
     */
    @Get('teacherCourses')
    findTeacherCourses() {
        return this.courseService.findTeacherCourses();
    }

    /**
     * Finds a specific teacher course
     * @param id Teacher course to find
     * @returns A list of teacher courses
     */
    @Get('teacherCourses/:id')
    findOneTeacherCourse(@Param('id') id: string) {
        return this.courseService.findOneTeacherCourse(+id);
    }

    /**
     * Finds a specific course
     * @param id Course to find
     * @returns A course
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(+id);
    }

    /**
     * Updates an existing course
     * @param id Course to update
     * @param updateCourseDto Information to update
     * @returns A result that indicates if the update was successful
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(+id, updateCourseDto);
    }

    /**
     * Removes a course
     * @param id Course to remove
     * @returns A result indicating if the remove was successfull
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courseService.remove(+id);
    }

    /**
     * Updates a teacher course
     * @param id Teacher course to update
     * @param updateTeacherCourseDto Information to update
     * @returns A result that indicates if the update was successful
     */
    @Patch('teacherCourses/:id')
    updateTeacherCourse(
        @Param('id') id: string,
        @Body() updateTeacherCourseDto: UpdateTeacherCourseDto,
    ) {
        return this.courseService.updateTeacherCourse(
            +id,
            updateTeacherCourseDto,
        );
    }

    /**
     * Finds a specific teacher course
     * @param id Teacher course to find
     * @returns A list of teacher courses
     */
    @Delete('teacherCourses/:id')
    removeTeacherCourse(@Param('id') id: string) {
        return this.courseService.removeTeacherCourse(+id);
    }
}
