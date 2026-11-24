import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Badge, Icon, Label, Link, Password, Radio, Spinner, Textarea } from './additional-atoms';

const meta: Meta = {
  title: 'Atoms/Additional',
  decorators: [moduleMetadata({ imports: [Badge, Icon, Label, Link, Password, Radio, Spinner, Textarea] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const PasswordField: Story = { render: () => ({ template: '<xui-password id="story-password" label="Password" />' }) };
export const TextArea: Story = { render: () => ({ template: '<xui-textarea id="story-message" label="Message" />' }) };
export const RadioOption: Story = { render: () => ({ template: '<xui-radio id="story-radio" name="story-choice" value="one" label="Option one" />' }) };
export const FormLabel: Story = { render: () => ({ template: '<xui-label forId="story-control">Accessible label</xui-label>' }) };
export const StatusBadge: Story = { render: () => ({ template: '<xui-badge text="Complete" tone="success" />' }) };
export const DecorativeIcon: Story = { render: () => ({ template: '<xui-icon glyph="★" /> <xui-icon glyph="!" label="Important" />' }) };
export const LinkExample: Story = { render: () => ({ template: '<xui-link href="https://example.com" label="Read more" />' }) };
export const LoadingSpinner: Story = { render: () => ({ template: '<xui-spinner label="Loading results" />' }) };
