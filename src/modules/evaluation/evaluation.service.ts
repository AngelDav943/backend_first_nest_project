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

  create(createEvaluationDto: CreateEvaluationDto) {
    return 'This action adds a new evaluation';
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

  update(id: number, updateEvaluationDto: UpdateEvaluationDto) {
    return `This action updates a #${id} evaluation`;
  }

  remove(id: number) {
    return `This action removes a #${id} evaluation`;
  }
}
