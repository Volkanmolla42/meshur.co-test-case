import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, ProductCardSkeleton, ProductGridSkeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
    title: 'Atoms/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        width: 200,
        height: 20,
    },
};

export const Circular: Story = {
    args: {
        variant: 'circular',
        width: 48,
        height: 48,
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
        width: 300,
    },
};

export const ProductCard: StoryObj<typeof ProductCardSkeleton> = {
    render: () => <ProductCardSkeleton />,
};

export const ProductGrid: StoryObj<typeof ProductGridSkeleton> = {
    render: () => <ProductGridSkeleton count={4} />,
    parameters: {
        layout: 'padded',
    },
};
