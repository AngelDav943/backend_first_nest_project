import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStudent } from './entities/task-student.entity';
import { Task } from './entities/task.entity';

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
     * Creates a new task
     * @param createTaskDto Data needed for the new task
     * @returns Returns the id of the new task
     */
    async create(createTaskDto: CreateTaskDto) {
        const createdTask = await this.taskRepository.save(createTaskDto);
        return createdTask.id;
    }

    /**
     * Finds all the tasks in the database
     * @returns A list of tasks
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
     * @returns A list of answers
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
     * @param id ID of the task to find
     * @returns A specific task
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
     * @param id ID of the existing task
     * @param updateTaskDto New data to update
     * @returns Returns true if successfull
     */
    async update(id: number, updateTaskDto: UpdateTaskDto) {
        const response = await this.taskRepository.update(id, updateTaskDto);
        return response.affected > 0;
    }

    /**
     * Removes a task from the database
     * @param id ID of the existing task
     * @returns Returns a boolean indicating whether the task was successfully deleted
     */
    async remove(id: number) {
        const response = await this.taskRepository.delete(id);
        return response.affected > 0;
    }
}
