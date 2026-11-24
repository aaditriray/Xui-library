import type { Meta, StoryObj } from '@storybook/angular';
import { Checkbox } from './checkbox';

const meta: Meta<Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Checkbox>;

export const Unchecked: Story = {
  args: { id: 'story-terms', label: 'Accept the terms' },
};

export const Checked: Story = {
  args: { id: 'story-news', label: 'Send product updates', checked: true },
};

export const Disabled: Story = {
  args: { id: 'story-disabled', label: 'Unavailable option', disabled: true },
};
