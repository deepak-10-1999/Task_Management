// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

console.log('Setting up MSW worker...');

export const worker = setupWorker(...handlers);