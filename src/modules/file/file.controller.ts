import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';

/**
 *
 */
@Controller('file')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    /**
     * Creates a new file
     * @param createFileDto Information needed to create the file
     * @returns Created file's id
     */
    @Post()
    create(@Body() createFileDto: CreateFileDto) {
        return this.fileService.create(createFileDto);
    }

    /**
     * Gives all files inside the database
     * @returns A list of files
     */
    @Get()
    findAll() {
        return this.fileService.findAll();
    }

    /**
     * Finds a specific file
     * @param id id needed to find file
     * @returns Returns the existing file with the matching id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.fileService.findOne(+id);
    }

    /**
     * Updates an existing file
     * @param id File to update
     * @param updateFileDto Information to update
     * @returns A boolean indicating whether the file was successfully updated
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
        return this.fileService.update(+id, updateFileDto);
    }

    /**
     * Removes an existing file
     * @param id File to remove
     * @returns A boolean indicating whether the file was successfuly removed
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.fileService.remove(+id);
    }
}
