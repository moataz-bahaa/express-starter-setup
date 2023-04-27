import prisma from '../prisma/client.js';
import { io } from '../app.js';

export const sendNotification = async (
  userId,
  type,
  title,
  content,
  metadata
) => {
  const notification = await prisma.notification.create({
    data: {
      title,
      type,
      content,
      metadata,
      userId,
    },
  });

  io.to(userId).emit('new-notification', notification);

  return notification;
};

export const sendMessage = async (msg) => {
  msg.chat?.users((user) => {
    if (user.id === msg.senderId) return;

    io.to(user.id).emit('new-msg', msg);
  });
};
