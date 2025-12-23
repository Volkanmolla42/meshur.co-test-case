import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../components/molecules/SearchBar';

const meta: Meta<typeof SearchBar> = {
    title: 'Molecules/SearchBar',
    component: SearchBar,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        locale: {
            control: 'select',
            options: ['tr', 'en'],
        },
        placeholder: {
            control: 'text',
        },
        defaultValue: {
            control: 'text',
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        locale: 'tr',
    },
};

export const WithPlaceholder: Story = {
    args: {
        locale: 'tr',
        placeholder: 'Ürün, marka veya kategori ara...',
    },
};

export const WithDefaultValue: Story = {
    args: {
        locale: 'tr',
        defaultValue: 'zeytinyağı',
    },
};

export const EnglishLocale: Story = {
    args: {
        locale: 'en',
        placeholder: 'Search products, brands...',
    },
};

export const WithCustomClass: Story = {
    args: {
        locale: 'tr',
        className: 'max-w-md',
    },
};
