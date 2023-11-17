import { ChatCompletionCreateParams } from 'openai/resources/chat/completions.mjs';

export const tools = [
  {
    name: 'search',
    description: 'Search wikipedia for a term, returns URL, title, and snippet',
    parameters: {
      type: 'object',
      properties: {
        searchTerm: {
          type: 'string',
          description: 'The term to search for',
        },
      },
      required: ['searchTerm'],
    },
  },
] as ChatCompletionCreateParams.Function[];
