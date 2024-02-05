import { z } from 'zod';
import { citySchema } from './api';

export type City = z.infer<typeof citySchema>;
