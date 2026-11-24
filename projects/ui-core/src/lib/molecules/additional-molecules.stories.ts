import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Breadcrumb, CheckboxGroup, Dropdown, InputGroup, RadioGroup, SearchBox } from './additional-molecules';

const meta: Meta = {
  title: 'Molecules/Additional',
  decorators: [moduleMetadata({ imports: [Breadcrumb, CheckboxGroup, Dropdown, InputGroup, RadioGroup, SearchBox] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;
const options = [{ label: 'First option', value: 'first' }, { label: 'Second option', value: 'second' }];

export const Search: Story = { render: () => ({ props: { options }, template: '<xui-search-box label="Search components" />' }) };
export const Select: Story = { render: () => ({ props: { options }, template: '<xui-dropdown label="Category" [options]="options" />' }) };
export const RadioChoices: Story = { render: () => ({ props: { options }, template: '<xui-radio-group label="Choose one" name="story-choice" [options]="options" />' }) };
export const CheckboxChoices: Story = { render: () => ({ props: { options }, template: '<xui-checkbox-group label="Choose any" [options]="options" />' }) };
export const Breadcrumbs: Story = { render: () => ({ props: { items: [{ label: 'Home', href: '/' }, { label: 'Components' }] }, template: '<xui-breadcrumb [items]="items" />' }) };
export const InputWithPrefix: Story = { render: () => ({ template: '<xui-input-group label="Price" prefix="$" type="number" />' }) };
