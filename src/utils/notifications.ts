import {Notification} from '../types';

export const createNotification = (
  userId: string,
  title: string,
  message: string,
  type: Notification['type'],
): Notification => {
  return {
    id: Date.now().toString(),
    userId,
    title,
    message,
    type,
    isRead: false,
    timestamp: new Date().toISOString(),
  };
};


