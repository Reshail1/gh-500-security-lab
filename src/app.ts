import { randomUUID } from 'node:crypto';
import express from 'express';

export const app = express();
app.use(express.json({ limit: '16kb' }));

const users = [
  { id: '1', name: 'Ada Lovelace' },
  { id: '2', name: 'Grace Hopper' },
];
const feedback: { id: string; message: string }[] = [];

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/users/:id', (request, response) => {
  const user = users.find((candidate) => candidate.id === request.params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.json(user);
});

app.post('/feedback', (request, response) => {
  const message: unknown = request.body?.message;
  if (typeof message !== 'string' || !message.trim() || message.trim().length > 500) {
    response.status(400).json({ error: 'message must be 1–500 characters' });
    return;
  }

  const entry = { id: randomUUID(), message: message.trim() };
  feedback.push(entry);
  response.status(201).json(entry);
});
