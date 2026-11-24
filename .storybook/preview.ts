import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^.*(Change|dismissed|activated)$' },
    controls: {
      expanded: true,
    },
  },
};

export default preview;
