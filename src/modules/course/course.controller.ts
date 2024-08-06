import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthTokenPayload } from '../auth/dto/login.dto';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateTeacherCourseDto } from './dto/create-teacher-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateTeacherCourseDto } from './dto/update-teacher-course.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.create(createCourseDto);
    }

    @Post('teacherCourses')
    createTeacherCourse(
        @Body() createTeacherCourseDto: CreateTeacherCourseDto,
    ) {
        return this.courseService.createTeacherCourse(createTeacherCourseDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    findAll() {
        return this.courseService.findAll();
    }

    @Get('joined')
    @UseGuards(AuthGuard)
    userCourses(@Request() request: Request) {
        const payload = request['payload'] as AuthTokenPayload;
        return this.courseService.findAll({
            id: payload.id,
        });
    }

    @Get('states')
    findStates() {
        return this.courseService.findStates();
    }

    @Get('teacherCourses')
    findTeacherCourses() {
        return this.courseService.findTeacherCourses();
    }

    @Get('teacherCourses/:id')
    findOneTeacherCourse(@Param('id') id: string) {
        return this.courseService.findOneTeacherCourse(+id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courseService.remove(+id);
    }

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

    @Delete('teacherCourses/:id')
    removeTeacherCourse(@Param('id') id: string) {
        return this.courseService.removeTeacherCourse(+id);
    }
}
