import type { Meta, StoryObj } from '@storybook/angular';
import { Modal } from './modal';

const meta: Meta<Modal> = {
  title: 'Organisms/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    open: true,
  },
};

export default meta;
type Story = StoryObj<Modal>;

export const Open: Story = {
  args: {
    title: 'Confirm action',
  },
  render: (args) => ({
    props: args,
    template: `
      <xui-modal [open]="open" [title]="title">
        <p>Are you sure you want to continue?</p>
      </xui-modal>
    `,
  }),
};
