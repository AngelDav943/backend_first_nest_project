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
    private fileRepository: Repository<FileEnt>
  ) {}

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    return this.fileRepository.find({
      relations: ["task", "user"]
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
