import { ForumMessage } from '../entities/forum-message.entity';

export type CreateForumMessageDto = Omit<
  ForumMessage,
  'createddate' | 'updateddate'
>;
