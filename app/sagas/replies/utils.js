import { BLOCK_MESSAGES } from '../../../common/enums';

export const validateMessage = messages => Object
  .keys(BLOCK_MESSAGES).some((key) => {
    const blockMessages = BLOCK_MESSAGES[key];
    return blockMessages.find(value => messages.includes(value));
  });
