import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Accordion, Footer, Header, Navigation, SidePanel, Stepper, Table, Tabs } from './additional-organisms';

const meta: Meta = {
  title: 'Organisms/Additional',
  decorators: [moduleMetadata({ imports: [Accordion, Footer, Header, Navigation, SidePanel, Stepper, Table, Tabs] })],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;
const columns = [{ key: 'name', header: 'Name' }, { key: 'status', header: 'Status' }];
const rows = [{ name: 'Jordan Lee', status: 'Active' }, { name: 'Taylor Chen', status: 'Pending' }];
const tabs = [{ id: 'overview', label: 'Overview', content: 'Overview content' }, { id: 'settings', label: 'Settings', content: 'Settings content' }];

export const DataTable: Story = { render: () => ({ props: { columns, rows }, template: '<xui-table caption="Team members" [columns]="columns" [rows]="rows" />' }) };
export const TabSet: Story = { render: () => ({ props: { tabs }, template: '<xui-tabs label="Account settings" [tabs]="tabs" />' }) };
export const Disclosure: Story = { render: () => ({ template: '<xui-accordion title="More information" content="Additional details are shown when expanded." />' }) };
export const NavigationLinks: Story = { render: () => ({ props: { items: [{ label: 'Home', href: '/', current: true }, { label: 'Components', href: '/components' }] }, template: '<xui-navigation [items]="items" />' }) };
export const SiteHeader: Story = { render: () => ({ template: '<xui-header title="XUI Library"><xui-navigation /></xui-header>' }) };
export const SiteFooter: Story = { render: () => ({ template: '<xui-footer copyright="© XUI Library"><nav aria-label="Footer"><a href="/privacy">Privacy</a></nav></xui-footer>' }) };
export const ProgressStepper: Story = { render: () => ({ props: { steps: ['Details', 'Review', 'Finish'] }, template: '<xui-stepper [steps]="steps" [currentStep]="1" />' }) };
export const DetailsPanel: Story = { render: () => ({ template: '<xui-side-panel [open]="true" title="Record details"><p>Details are shown here.</p></xui-side-panel>' }) };
