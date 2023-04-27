import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { Server } from 'socket.io';
import passport from 'passport';

import authRoutes from './routes/auth.js';
import errorHandlerMiddleware from './middlewares/error-handler.js';
import { addPassportJwtStrategy } from './middlewares/passport.js';

const app = express();

// middlewares
addPassportJwtStrategy();
app.use(cors({ origin: '*' }));
app.use(express.static(path.resolve('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// routes
app.use('/auth', authRoutes);

// error handler
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

// socket
export const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  //connected to correct id
  socket.on('setup', (userId) => {
    socket.join(userId);
    socket.emit('connected');
  });

  socket.on('join-chat', (chat) => {
    socket.join(chat);
  });

  socket.on('typing', (chat) => socket.in(chat).emit('typing'));
  socket.on('stop-typing', (chat) => socket.in(chat).emit('stop-typing'));

  socket.on('disconnect', () => {
    // Remove the user from any rooms they are in
    Object.keys(socket.rooms).forEach((room) => {
      socket.leave(room);
    });
  });
});
