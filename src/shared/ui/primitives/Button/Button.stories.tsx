import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'icon'],
        },
        isLoading: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        children: 'Sepete Ekle',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Devam Et',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'İptal',
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Daha Fazla',
    },
};

export const Loading: Story = {
    args: {
        variant: 'primary',
        isLoading: true,
        children: 'Yükleniyor...',
    },
};

export const Small: Story = {
    args: {
        variant: 'primary',
        size: 'sm',
        children: 'Küçük Buton',
    },
};

export const Large: Story = {
    args: {
        variant: 'primary',
        size: 'lg',
        children: 'Büyük Buton',
    },
};

export const FullWidth: Story = {
    args: {
        variant: 'primary',
        fullWidth: true,
        children: 'Tam Genişlik',
    },
};

export const Disabled: Story = {
    args: {
        variant: 'primary',
        disabled: true,
        children: 'Devre Dışı',
    },
};
