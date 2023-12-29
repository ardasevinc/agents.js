import { AiProvider } from './ai.js';

type BaseAgentParams = {
  basePrompt: string;
};

abstract class BaseAgent {
  protected basePrompt: string;

  constructor({ basePrompt }: BaseAgentParams) {
    this.basePrompt = basePrompt;
  }

  abstract run(): Promise<void>;
}

class AutonomousAgent extends BaseAgent {
  async run(): Promise<void> {
    console.log('Autonomous agent run starting...');
    const aiProvider = AiProvider.getInstance({
      openaiKey: process.env?.['OPENAI_API_KEY'] ?? '',
    });
    const openai = aiProvider.getOpenAi();
  }
}

class InteractiveAgent extends BaseAgent {}
