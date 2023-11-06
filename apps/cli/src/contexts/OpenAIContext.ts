import { createContext } from 'react';
import { OpenAI } from '../config/openai.js';

export const OpenAIContext = createContext<typeof OpenAI | undefined>(OpenAI);
