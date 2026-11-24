import type { Meta, StoryObj } from '@storybook/angular';
import { Textbox } from './textbox';

const meta: Meta<Textbox> = {
  title: 'Atoms/Textbox',
  component: Textbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Textbox>;

export const Default: Story = {
  args: {
    id: 'story-display-name',
    label: 'Display name',
    value: '',
  },
};

export const Error: Story = {
  args: {
    id: 'story-email',
    label: 'Email address',
    type: 'email',
    invalid: true,
    errorId: 'story-email-error',
  },
};
