import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { EvaluationService } from './evaluation.service';

/**
 *
 */
@Controller('evaluation')
export class EvaluationController {
    constructor(private readonly evaluationService: EvaluationService) {}

    /**
     * Creates an new evaluation
     * @param createEvaluationDto Information needed to create a new evaluation
     * @returns Gives the id of the new evaluation
     */
    @Post()
    create(@Body() createEvaluationDto: CreateEvaluationDto) {
        return this.evaluationService.create(createEvaluationDto);
    }

    /**
     * Finds all the evaluations in the database
     * @returns A list of evaluations
     */
    @Get()
    findAll() {
        return this.evaluationService.findAll();
    }

    /**
     * Finds a specific evaluation
     * @param id Evaluation to find
     * @returns An evaluation
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.evaluationService.findOne(+id);
    }

    /**
     * Updates an existing evaluation
     * @param id Evaluation to update
     * @param updateEvaluationDto Information to update
     * @returns Gives a boolean indicating whether the update action was successfull
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateEvaluationDto: UpdateEvaluationDto,
    ) {
        return this.evaluationService.update(+id, updateEvaluationDto);
    }

    /**
     * Removes an existing evaluation
     * @param id Evaluation to remove
     * @returns Gives a boolean indicating whether the remove action was successfull
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.evaluationService.remove(+id);
    }
}
