import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

/**
 *
 */
@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    /**
     * Creates a new task
     * @param createTaskDto Data needed for the new task
     * @returns Returns the id of the new task
     */
    @Post()
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.create(createTaskDto);
    }

    /**
     * Finds all the tasks in the database
     * @returns A list of tasks
     */
    @Get()
    findAll() {
        return this.taskService.findAll();
    }

    /**
     * @returns A list of answers
     */
    @Get('/answers')
    findAnswers() {
        return this.taskService.findAllAnswers();
    }

    /**
     * @param id ID of the task to find
     * @returns A specific task
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.taskService.findOne(+id);
    }

    /**
     * @param id ID of the existing task
     * @param updateTaskDto New data to update
     * @returns Returns true if successfull
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(+id, updateTaskDto);
    }

    /**
     * Removes a task from the database
     * @param id ID of the existing task
     * @returns Returns a boolean indicating whether the task was successfully deleted
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.taskService.remove(+id);
    }
}
