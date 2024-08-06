import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { Forum } from './entities/forum.entity';
import { ForumMessage } from './entities/forum-message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateForumMessageDto } from './dto/create-forum-message.dto';
import { UpdateForumMessageDto } from './dto/update-forum-message.dto';

/**
 *
 */
@Injectable()
export class ForumService {
    constructor(
        @InjectRepository(Forum)
        private forumRepository: Repository<Forum>,
        @InjectRepository(ForumMessage)
        private forumMessageRepository: Repository<ForumMessage>,
    ) {}

    /**
     *
     * @param createForumDto
     */
    async create(createForumDto: CreateForumDto) {
        const createdForum = await this.forumRepository.save(createForumDto);
        return createdForum.id;
    }

    /**
     *
     * @param createMessageDto
     */
    async sendMessage(createMessageDto: CreateForumMessageDto) {
        const createdMessage =
            await this.forumMessageRepository.save(createMessageDto);
        return createdMessage.id;
    }

    /**
     *
     */
    findAll() {
        return this.forumRepository.find({
            relations: ['messages', 'course'],
        });
    }

    /**
     *
     * @param forumID
     */
    findAllMessages(forumID: number) {
        return this.forumMessageRepository.find({
            where: {
                forum: { id: forumID },
            },
            relations: ['forum'],
        });
    }

    /**
     *
     * @param id
     */
    findOne(id: number) {
        return this.forumRepository.findOne({
            relations: {
                messages: {
                    user: true,
                },
            },
            where: { id: id },
        });
    }

    /**
     *
     * @param id
     * @param updateForumDto
     */
    async update(id: number, updateForumDto: UpdateForumDto) {
        const response = await this.forumRepository.update(id, updateForumDto);
        return response.affected > 0;
    }

    /**
     *
     * @param id
     */
    async remove(id: number) {
        const response = await this.forumRepository.delete(id);
        return response.affected > 0;
    }

    /**
     *
     * @param id
     * @param updateForumMessageDto
     */
    async updateMessage(
        id: number,
        updateForumMessageDto: UpdateForumMessageDto,
    ) {
        const response = await this.forumMessageRepository.update(
            id,
            updateForumMessageDto,
        );
        return response.affected > 0;
    }

    /**
     *
     * @param id
     */
    async removeMessage(id: number) {
        const response = await this.forumMessageRepository.delete(id);
        return response.affected > 0;
    }
}
