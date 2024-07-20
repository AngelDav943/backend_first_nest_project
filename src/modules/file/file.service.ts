import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEnt } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEnt)
    private fileRepository: Repository<FileEnt>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    const createdFile = await this.fileRepository.save(createFileDto);
    return createdFile.id;
  }

  findAll() {
    return this.fileRepository.find({
      relations: ['taskStudent'],
    });
  }

  findOne(id: number) {
    return this.fileRepository.findOne({
      relations: ['taskStudent'],
      where: { id },
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    const response = await this.fileRepository.update(id, updateFileDto);
    return response.affected > 0;
  }

  async remove(id: number) {
    const response = await this.fileRepository.delete(id);
    return response.affected > 0;
  }
}
