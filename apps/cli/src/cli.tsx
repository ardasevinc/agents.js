#!/usr/bin/env node

import React, { StrictMode, useContext } from 'react';
import { render } from 'ink';
import { App } from './app.js';
import meow from 'meow';
import { OpenAIContext } from './contexts/OpenAIContext.js';

const cli = meow(
  `
	Usage
	  $ agent

	Examples
	  $ agent
  `,
  {
    importMeta: import.meta,
  },
);

export interface MainCLIPropType {
  flags: typeof cli;
}

const Main = ({ flags }: MainCLIPropType) => {
  const openai = useContext(OpenAIContext);
  return (
    <OpenAIContext.Provider value={openai}>
      <App flags={flags} />
    </OpenAIContext.Provider>
  );
};

render(<Main flags={cli} />);
