import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { CreateForumMessageDto } from './dto/create-forum-message.dto';
import { UpdateForumMessageDto } from './dto/update-forum-message.dto';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  create(@Body() createForumDto: CreateForumDto) {
    return this.forumService.create(createForumDto);
  }

  @Post('messages')
  createMessage(@Body() createForumMessageDto: CreateForumMessageDto) {
    return this.forumService.sendMessage(createForumMessageDto);
  }

  @Get()
  findAll() {
    return this.forumService.findAll();
  }


  @Get('messages/:id')
  findForumMessages(@Param('id') id: string) {
    if (isNaN(+id) == false) return this.forumService.findAllMessages(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id) == false) return this.forumService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForumDto: UpdateForumDto) {
    if (isNaN(+id) == false) return this.forumService.update(+id, updateForumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (isNaN(+id) == false) return this.forumService.remove(+id);
  }

  @Patch('messages/:id')
  updateMessage(@Param('id') id: string, @Body() updateForumMessageDto: UpdateForumMessageDto) {
    if (isNaN(+id) == false) return this.forumService.updateMessage(+id, updateForumMessageDto);
  }

  @Delete('messages/:id')
  removeMessage(@Param('id') id: string) {
    if (isNaN(+id) == false) return this.forumService.removeMessage(+id);
  }
}
