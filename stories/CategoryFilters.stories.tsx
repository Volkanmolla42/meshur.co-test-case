import type { Meta, StoryObj } from '@storybook/react';
import { CategoryFilters } from '../components/molecules/CategoryFilters';
import { Brand } from '../types';

const mockBrands: Brand[] = [
    { id: 1, name: 'Tariş', slug: 'taris', description: null, websiteUrl: null },
    { id: 2, name: 'Komili', slug: 'komili', description: null, websiteUrl: null },
    { id: 3, name: 'Zade', slug: 'zade', description: null, websiteUrl: null },
    { id: 4, name: 'Kristal', slug: 'kristal', description: null, websiteUrl: null },
];

const meta: Meta<typeof CategoryFilters> = {
    title: 'Molecules/CategoryFilters',
    component: CategoryFilters,
    parameters: {
        layout: 'padded',
        nextjs: {
            appDirectory: true,
        },
    },
    tags: ['autodocs'],
    argTypes: {
        initialMinPrice: {
            control: 'number',
        },
        initialMaxPrice: {
            control: 'number',
        },
        initialInStock: {
            control: 'boolean',
        },
        initialBrandId: {
            control: 'number',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        brands: mockBrands,
    },
};

export const WithInitialValues: Story = {
    args: {
        brands: mockBrands,
        initialMinPrice: 100,
        initialMaxPrice: 500,
        initialInStock: true,
        initialBrandId: 1,
    },
};

export const NoBrands: Story = {
    args: {
        brands: [],
    },
};

export const InStockOnly: Story = {
    args: {
        brands: mockBrands,
        initialInStock: true,
    },
};
