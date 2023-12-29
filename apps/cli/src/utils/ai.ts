import OpenAI from 'openai';

type ApiKeys = {
  openaiKey: string;
};

class AiProvider {
  public static getInstance({ openaiKey }: ApiKeys): AiProvider {
    if (!AiProvider.instance) {
      AiProvider.instance = new AiProvider(openaiKey);
    }

    return AiProvider.instance;
  }

  private static instance: AiProvider;
  private readonly openAi: OpenAI;

  private constructor(private readonly apiKey: string) {
    this.apiKey = apiKey;
    this.openAi = new OpenAI({
      apiKey: this.apiKey,
      maxRetries: 10,
      timeout: 1000,
    });
  }

  public getOpenAi(): OpenAI {
    return this.openAi;
  }
}

export { AiProvider };
