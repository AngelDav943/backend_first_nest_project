import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { ForumMessage } from './entities/forum-message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Forum)
    private forumRepository: Repository<Forum>,
    @InjectRepository(ForumMessage)
    private forumMessageRepository: Repository<ForumMessage>,
  ) { }

  create(createForumDto: CreateForumDto) {
    return 'This action adds a new forum';
  }

  findAll() {
    return this.forumRepository.find({
      relations: ['messages', 'course']
    });
  }

  findAllMessages(forumID: number) {
    return this.forumMessageRepository.find({
      where: {
        forum: { id: forumID }
      },
      relations: ['forum']
    })
  }

  findOne(id: number) {
    return this.forumRepository.findOne({
      where: { id: id }
    })
  }

  update(id: number, updateForumDto: UpdateForumDto) {
    return `This action updates a #${id} forum`;
  }

  remove(id: number) {
    return `This action removes a #${id} forum`;
  }
}
