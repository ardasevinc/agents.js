import 'dotenv/config';
import OpenAI from 'openai';

if (!process.env['OPENAI_API_KEY']) {
  throw new Error('OPENAI_API_KEY not set');
}

const OPENAI_API_KEY = process.env['OPENAI_API_KEY'] as string;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export { openai as OpenAI };
