import { useContext, useState, useEffect, useRef } from 'react';
import { OpenAIContext } from '../contexts/OpenAIContext.js';
import {
  ChatCompletionMessageParam,
  ChatCompletionCreateParamsBase,
} from 'openai/resources/chat/completions.mjs';
import { tools } from '../config/tools.js';

interface UserMessage {
  content: string;
}

export const useChat = (
  systemPrompt: string,
  model: ChatCompletionCreateParamsBase['model'],
) => {
  const openai = useContext(OpenAIContext);
  const [aiResponse, setAiResponse] = useState('');
  const [userMessages, setUserMessages] = useState<UserMessage[]>([]);

  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
    { role: 'system', content: systemPrompt },
  ]);

  const addUserMessage = (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setUserMessages((prevUserMessages) => [
      ...prevUserMessages,
      { content: message },
    ]);
  };
  useEffect(() => {
    let aiResponseBuffer = '';
    let ignore = false;
    if (messages.length === 1) return;
    (async () => {
      if (!openai) return;
      const completionStream = await openai?.chat.completions.create({
        model: model,
        stream: true,
        messages: messages,
        functions: tools,
        max_tokens: 4000,
        temperature: 0.8,
      });

      for await (const part of completionStream) {
        if (ignore) break;
        if (part.choices[0]?.finish_reason !== null) {
          console.log(
            `Completion finished due to reason: ${part.choices[0]?.finish_reason}`,
          );
          setAiResponse('');
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: aiResponseBuffer,
            },
          ]);

          console.log(messages);
          ignore = true;
          break;
        }

        setAiResponse((prev) => {
          // console.log(part.choices[0]?.delta?.content);
          aiResponseBuffer += part.choices[0]?.delta?.content ?? '';
          return prev.concat(part.choices[0]?.delta?.content ?? '');
        });
      }
    })();
    return () => {
      ignore = true;
    };
  }, [openai, userMessages]);

  return {
    aiResponse,
    addUserMessage,
    messages,
  };
};
