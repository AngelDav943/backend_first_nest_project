import { Injectable } from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluationService {

  constructor(
    @InjectRepository(Evaluation)
    private EvaluationRepository: Repository<Evaluation>
  ) {}

  async create(createEvaluationDto: CreateEvaluationDto) {
      const createdEvaluation = await this.EvaluationRepository.save(createEvaluationDto)
      return createdEvaluation.id;
  }

  findAll() {
    return this.EvaluationRepository.find({
      relations: ["course"]
    });
  }

  findOne(id: number) {
    return this.EvaluationRepository.findOne({
      relations: ["course"],
      where: { id }
    })
  }

  async update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
      const response = await this.EvaluationRepository.update(id, updateEvaluationDto)
      return response.affected > 0
  }

  async remove(id: number) {
      const response = await this.EvaluationRepository.delete(id)
      return response.affected > 0;
  }
}
