import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
  },
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
  args: { label: 'Save changes', variant: 'primary' },
};

export const Secondary: Story = {
  args: { label: 'Cancel', variant: 'secondary' },
};

export const Danger: Story = {
  args: { label: 'Delete', variant: 'danger' },
};

export const Disabled: Story = {
  args: { label: 'Unavailable', disabled: true },
};
