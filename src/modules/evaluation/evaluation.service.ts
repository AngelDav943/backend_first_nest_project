import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity';

/**
 *
 */
@Injectable()
export class EvaluationService {
    constructor(
        @InjectRepository(Evaluation)
        private EvaluationRepository: Repository<Evaluation>,
    ) {}

    /**
     * Creates an new evaluation
     * @param createEvaluationDto Information needed to create a new evaluation
     * @returns Gives the id of the new evaluation
     */
    async create(createEvaluationDto: CreateEvaluationDto) {
        const createdEvaluation =
            await this.EvaluationRepository.save(createEvaluationDto);
        return createdEvaluation.id;
    }

    /**
     * Finds all the evaluations in the database
     * @returns A list of evaluations
     */
    findAll() {
        return this.EvaluationRepository.find({
            relations: ['course'],
        });
    }

    /**
     * Finds a specific evaluation
     * @param id Evaluation to find
     * @returns An evaluation
     */
    findOne(id: number) {
        return this.EvaluationRepository.findOne({
            relations: ['course'],
            where: { id },
        });
    }

    /**
     * Updates an existing evaluation
     * @param id Evaluation to update
     * @param updateEvaluationDto Information to update
     * @returns Gives a boolean indicating whether the update action was successfull
     */
    async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
        const response = await this.EvaluationRepository.update(
            id,
            updateEvaluationDto,
        );
        return response.affected > 0;
    }

    /**
     * Removes an existing evaluation
     * @param id Evaluation to remove
     * @returns Gives a boolean indicating whether the remove action was successfull
     */
    async remove(id: number) {
        const response = await this.EvaluationRepository.delete(id);
        return response.affected > 0;
    }
}
