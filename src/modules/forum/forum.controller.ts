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
     * Creates a new forum
     * @param createForumDto Minimal information needed to create the forum
     * @returns Returns the id of the new forum
     */
    @Post()
    create(@Body() createForumDto: CreateForumDto) {
        return this.forumService.create(createForumDto);
    }

    /**
     * Creates a message inside a specific forum
     * @param createForumMessageDto Message information
     * @returns Returns the id of the new message
     */
    @Post('messages')
    createMessage(@Body() createForumMessageDto: CreateForumMessageDto) {
        return this.forumService.sendMessage(createForumMessageDto);
    }

    /**
     * Finds all the existing forums in the database
     * @returns A list of forums
     */
    @Get()
    findAll() {
        return this.forumService.findAll();
    }

    /**
     * Gives all the existing messages inside a forum
     * @param id Forum ID
     * @returns A list of messages
     */
    @Get('messages/:id')
    findForumMessages(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.findAllMessages(+id);
    }

    /**
     * Gives a specific forum
     * @param id ID of the forum to find
     * @returns A forum
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.findOne(+id);
    }

    /**
     * Updates the information of a forum
     * @param id Forum to update
     * @param updateForumDto New information
     * @returns Returns a boolean indicating if the action was successful
     */
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
        if (isNaN(+id) == false)
            return this.forumService.update(+id, updateForumDto);
    }

    /**
     * Removes a forum
     * @param id Forum to remove
     * @returns Returns a boolean indicating whether the action was successfull
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.remove(+id);
    }

    /**
     * Updates the information of an existing message
     * @param id ID of the message to update
     * @param updateForumMessageDto New information
     * @returns Returns a boolean indicating if the action affected the database
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
     * Removes a message from the database
     * @param id Message to delete
     * @returns A boolean indicating if it was successful on the delete action
     */
    @Delete('messages/:id')
    removeMessage(@Param('id') id: string) {
        if (isNaN(+id) == false) return this.forumService.removeMessage(+id);
    }
}
