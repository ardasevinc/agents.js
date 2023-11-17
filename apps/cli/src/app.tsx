import React, { useState } from 'react';
import { Box, Text } from 'ink';
import { MainCLIPropType } from './cli.js';
import { useChat } from './utils/useChat.js';
import TextInput from 'ink-text-input';
import MessageHistory from './components/MessageHistory.js';

export const App = ({ flags }: MainCLIPropType) => {
  const systemPrompt = 'immerse yourself';
  const { aiResponse, addUserMessage, messages } = useChat(
    systemPrompt,
    'gpt-3.5-turbo-1106',
  );
  const [userInput, setUserInput] = useState('');

  return (
    <Box paddingX={2} flexDirection='column'>
      <Box flexDirection='column'>
        {messages.map((message, idx) =>
          message.role === 'user' ? (
            <Text key={idx}>User: {message.content}</Text>
          ) : message.role === 'assistant' ? (
            <Text key={idx} color={'green'}>
              AI: {message.content}
            </Text>
          ) : message.role === 'function' ? (
            <Text key={idx}>FN: {message.content}</Text>
          ) : (
            ''
          ),
        )}
      </Box>
      {aiResponse === '' ? (
        ''
      ) : (
        <Box>
          <Text color={'green'}>AI: {aiResponse}</Text>
        </Box>
      )}

      <Box marginTop={3}>
        <Box>
          <Text>Input: </Text>
        </Box>
        <TextInput
          value={userInput}
          onChange={setUserInput}
          onSubmit={() => {
            addUserMessage(userInput);
            setUserInput('');
          }}
        />
      </Box>
    </Box>
  );
};
