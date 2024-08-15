import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileEnt } from './entities/file.entity';

/**
 *
 */
@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileEnt)
        private fileRepository: Repository<FileEnt>,
    ) {}

    /**
     * Creates a new file
     * @param createFileDto Information needed to create the file
     * @returns Created file's id
     */
    async create(createFileDto: CreateFileDto) {
        const createdFile = await this.fileRepository.save(createFileDto);
        return createdFile.id;
    }

    /**
     * Gives all files inside the database
     * @returns A list of files
     */
    findAll() {
        return this.fileRepository.find({
            relations: ['taskStudent'],
        });
    }

    /**
     * Finds a specific file
     * @param id id needed to find file
     * @returns Returns the existing file with the matching id
     */
    findOne(id: number) {
        return this.fileRepository.findOne({
            relations: ['taskStudent'],
            where: { id },
        });
    }

    /**
     * Updates an existing file
     * @param id File to update
     * @param updateFileDto Information to update
     * @returns A boolean indicating whether the file was successfully updated
     */
    async update(id: number, updateFileDto: UpdateFileDto) {
        const response = await this.fileRepository.update(id, updateFileDto);
        return response.affected > 0;
    }

    /**
     * Removes an existing file
     * @param id File to remove
     * @returns A boolean indicating whether the file was successfuly removed
     */
    async remove(id: number) {
        const response = await this.fileRepository.delete(id);
        return response.affected > 0;
    }
}
