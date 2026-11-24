import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormField } from './form-field';
import { Textbox } from '../../atoms/textbox/textbox';

const meta: Meta<FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [Textbox],
    }),
  ],
};

export default meta;
type Story = StoryObj<FormField>;

export const Default: Story = {
  args: {
    label: 'Account details',
    hint: 'Use a name visible to other users.',
  },
  render: (args) => ({
    props: args,
    template: `
      <xui-form-field [label]="label" [hint]="hint">
        <xui-textbox id="account-name" label="Display name" />
      </xui-form-field>
    `,
  }),
};

export const Error: Story = {
  args: {
    label: 'Account details',
    invalid: true,
    error: 'Enter a display name.',
  },
  render: (args) => ({
    props: args,
    template: `
      <xui-form-field [label]="label" [invalid]="invalid" [error]="error">
        <xui-textbox id="account-name-error" label="Display name" [invalid]="true" />
      </xui-form-field>
    `,
  }),
};
