import { Hono } from 'hono';
import { chat } from './chat';

export const app = new Hono().basePath('/api');

export const routes = app.route('/chat', chat);
