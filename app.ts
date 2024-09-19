import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import DatabaseModule from './modules/database';
import UserModule from './modules/user';
import MessageModule from './modules/message';
import AttackModule from './modules/attack';

import { CLIENT, PORT, DATABASE } from './constants.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

app.use(express.static('./client/dist/'));

server.listen(PORT, () => console.log(`RPS started on port: ${PORT}`));

const db = async () => {
  const db = new DatabaseModule(); // Initialize the database
  await db.init(DATABASE); // Initialize the database
  await db.set('John', 'Doe');
};
db();
const sharedState = {
  users: new Map<string, any>(), // Adjust the type accordingly
};

UserModule.init(io, sharedState);
MessageModule.init(io, sharedState);
AttackModule.init(io, sharedState);
