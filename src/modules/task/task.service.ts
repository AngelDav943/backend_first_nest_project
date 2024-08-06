import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskStudent } from './entities/task-student.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 *
 */
@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        @InjectRepository(TaskStudent)
        private taskStudentRepository: Repository<TaskStudent>,
    ) {}

    /**
     *
     * @param createTaskDto
     */
    async create(createTaskDto: CreateTaskDto) {
        const createdTask = await this.taskRepository.save(createTaskDto);
        return createdTask.id;
    }

    /**
     *
     */
    findAll() {
        return this.taskRepository.find({
            relations: {
                answers: {
                    teacherCourseStudent: {
                        student: true,
                    },
                    files: true,
                },
                teacherCourse: {
                    course: true,
                    teacher: true,
                },
            },
        });
    }

    /**
     *
     */
    findAllAnswers() {
        return this.taskStudentRepository.find({
            relations: {
                teacherCourseStudent: {
                    student: true,
                    teacherCourse: true,
                },
                task: true,
            },
        });
    }

    /**
     *
     * @param id
     */
    findOne(id: number) {
        return this.taskRepository.findOne({
            where: { id },
            relations: {
                teacherCourse: {
                    course: true,
                    teacher: true,
                    students: true,
                },
            },
        });
    }

    /**
     *
     * @param id
     * @param updateTaskDto
     */
    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const response = await this.taskRepository.update(id, updateTaskDto);
        return response.affected > 0;
    }

    /**
     *
     * @param id
     */
    async remove(id: number) {
        const response = await this.taskRepository.delete(id);
        return response.affected > 0;
    }
}
