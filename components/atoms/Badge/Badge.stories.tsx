import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Atoms/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'success', 'warning', 'danger', 'info', 'orange'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Varsayılan',
    },
};

export const Success: Story = {
    args: {
        variant: 'success',
        children: 'Çok Satan',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
        children: 'Son Stok',
    },
};

export const Danger: Story = {
    args: {
        variant: 'danger',
        children: '%25 İndirim',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
        children: 'Yeni',
    },
};

export const Orange: Story = {
    args: {
        variant: 'orange',
        children: 'Kampanya',
    },
};

export const SmallSize: Story = {
    args: {
        variant: 'success',
        size: 'sm',
        children: 'Küçük',
    },
};

export const MediumSize: Story = {
    args: {
        variant: 'success',
        size: 'md',
        children: 'Orta',
    },
};
