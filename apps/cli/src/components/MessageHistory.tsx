import React from 'react';
import { Box, Text } from 'ink';

const MessageHistory = (messages) => {
  return (
    <Box flexDirection='column'>
      {messages.map((message, idx) =>
        message.role === 'user' ? (
          <Text key={idx}>User: {message.content}</Text>
        ) : message.role === 'assistant' ? (
          <Text key={idx} color={'green'}>
            AI: {message.content}
          </Text>
        ) : (
          ''
        ),
      )}
    </Box>
  );
};

export default MessageHistory;
