import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from '../atoms/button/button';
import { Checkbox } from '../atoms/checkbox/checkbox';
import { Password } from '../atoms/additional-atoms';
import { Textbox } from '../atoms/textbox/textbox';
import { SearchBox } from '../molecules/additional-molecules';
import { Table } from '../organisms/additional-organisms';
import { DashboardTemplate, LoginTemplate, MasterDetailTemplate, SearchTemplate } from './templates';

const meta: Meta = {
  title: 'Templates/Pages',
  decorators: [moduleMetadata({ imports: [Button, Checkbox, DashboardTemplate, LoginTemplate, MasterDetailTemplate, Password, SearchBox, SearchTemplate, Table, Textbox] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;
const columns = [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }];
const rows = [{ name: 'Jordan Lee', status: 'Active' }, { name: 'Taylor Chen', status: 'Pending' }];

export const Login: Story = { render: () => ({ template: '<xui-login-template />' }) };
export const Dashboard: Story = { render: () => ({ props: { metrics: [{ label: 'Active users', value: '128' }, { label: 'Open requests', value: '12' }] }, template: '<xui-dashboard-template [metrics]="metrics" />' }) };
export const Search: Story = { render: () => ({ template: '<xui-search-template />' }) };
export const MasterDetail: Story = { render: () => ({ props: { columns, rows }, template: '<xui-master-detail-template [columns]="columns" [rows]="rows" />' }) };
