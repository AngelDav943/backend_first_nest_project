import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateForumMessageDto } from './dto/create-forum-message.dto';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumMessageDto } from './dto/update-forum-message.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { ForumMessage } from './entities/forum-message.entity';
import { Forum } from './entities/forum.entity';

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
     * Creates a new forum
     * @param createForumDto Minimal information needed to create the forum
     * @returns Returns the id of the new forum
     */
    async create(createForumDto: CreateForumDto) {
        const createdForum = await this.forumRepository.save(createForumDto);
        return createdForum.id;
    }

    /**
     * Creates a message inside a specific forum
     * @param createMessageDto Message information
     * @returns Returns the id of the new message
     */
    async sendMessage(createMessageDto: CreateForumMessageDto) {
        const createdMessage =
            await this.forumMessageRepository.save(createMessageDto);
        return createdMessage.id;
    }

    /**
     * Finds all the existing forums in the database
     * @returns A list of forums
     */
    findAll() {
        return this.forumRepository.find({
            relations: ['messages', 'course'],
        });
    }

    /**
     * Gives all the existing messages inside a forum
     * @param forumID Forum ID
     * @returns A list of messages
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
     * Gives a specific forum
     * @param id ID of the forum to find
     * @returns A forum
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
     * Updates the information of a forum
     * @param id Forum to update
     * @param updateForumDto New information
     * @returns Returns a boolean indicating if the action was successful
     */
    async update(id: number, updateForumDto: UpdateForumDto) {
        const response = await this.forumRepository.update(id, updateForumDto);
        return response.affected > 0;
    }

    /**
     * Removes a forum
     * @param id Forum to remove
     * @returns Returns a boolean indicating whether the action was successfull
     */
    async remove(id: number) {
        const response = await this.forumRepository.delete(id);
        return response.affected > 0;
    }

    /**
     * Updates the information of an existing message
     * @param id ID of the message to update
     * @param updateForumMessageDto New information
     * @returns Returns a boolean indicating if the action affected the database
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
     * Removes a message from the database
     * @param id Message to delete
     * @returns A boolean indicating if it was successful on the delete action
     */
    async removeMessage(id: number) {
        const response = await this.forumMessageRepository.delete(id);
        return response.affected > 0;
    }
}
