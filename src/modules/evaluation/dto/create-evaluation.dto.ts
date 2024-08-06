import { Evaluation } from '../entities/evaluation.entity';

export type CreateEvaluationDto = Omit<
    Evaluation,
    'createddate' | 'updateddate'
>;
