import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { CreateForumMessageDto } from './dto/create-forum-message.dto';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumMessageDto } from './dto/update-forum-message.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { ForumService } from './forum.service';

/**
 *
 */
@Controller('forum')
export class ForumController {
    constructor(private readonly forumService: ForumService) {}

    /**
     *
     * @param createForumDto
     */
    @Post()
    create(@Body() createForumDto: CreateForumDto) {
        return this.forumService.create(createForumDto);
    }

    /**
     *
     * @param createForumMessageDto
     */
    @Post('messages')
    createMessage(@Body() createForumMessageDto: CreateForumMessageDto) {
        return this.forumService.sendMessage(createForumMessageDto);
    }

    /**
     *
     */
    @Get()
    findAll() {
        return this.forumService.findAll();
    }

    /**
     *
     * @param id
     */
    @Get('messages/:id')
    findForumMessages(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.findAllMessages(+id);
    }

    /**
     *
     * @param id
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.findOne(+id);
    }

    /**
     *
     * @param id
     * @param updateForumDto
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
        if (isNaN(+id) == false)
            return this.forumService.update(+id, updateForumDto);
    }

    /**
     *
     * @param id
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.remove(+id);
    }

    /**
     *
     * @param id
     * @param updateForumMessageDto
     */
    @Patch('messages/:id')
    updateMessage(
        @Param('id') id: string,
        @Body() updateForumMessageDto: UpdateForumMessageDto,
    ) {
        if (isNaN(+id) == false)
            return this.forumService.updateMessage(+id, updateForumMessageDto);
    }

    /**
     *
     * @param id
     */
    @Delete('messages/:id')
    removeMessage(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.removeMessage(+id);
    }
}
