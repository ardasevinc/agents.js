#!/usr/bin/env node
import { select } from '@inquirer/prompts';

const agentType = await select({
  message: 'Select agent',
  choices: [
    {
      name: 'Reason and Act',
      value: 'react',
    },
    {
      name: 'Chain of Thought Generator',
      value: 'cot',
    },
    {
      name: 'Exit',
      value: 'exit',
    },
  ],
});

switch (agentType) {
  case 'react': {
    const reactAgentFlavor = await select({
      message: 'Select prompting strategy',
      choices: [
        { name: 'Zero-Shot', value: 'zero-shot' },
        { name: 'One-Shot', value: 'one-shot' },
        { name: 'Few-Shot', value: 'few-shot' },
      ],
    });
    break;
  }

  case 'cot': {
    console.log('cot');
    break;
  }

  case 'exit': {
    process.exit(0);
  }

  // eslint-disable-next-line no-fallthrough
  default: {
    console.log('default');
    process.exit(1);
  }
}
