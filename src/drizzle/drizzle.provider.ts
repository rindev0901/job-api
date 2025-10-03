// src/drizzle/drizzle.provider.ts
import { Provider } from '@nestjs/common';
import { db } from './db'; // Import your Drizzle client

export const DRIZZLE_CLIENT = 'DRIZZLE_CLIENT';

export const DrizzleProvider: Provider = {
  provide: DRIZZLE_CLIENT, // Token to inject the client
  useValue: db,
};
