import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from '@/shared/ui/react/ProductCard';
import { Product } from '@/types';

// Mock product data
const baseProduct: Product = {
    id: 1,
    name: 'Organik Zeytinyağı - Natürel Sızma 1L',
    slug: 'organik-zeytinyagi-naturel-sizma-1l',
    description: 'Ege bölgesinden organik zeytinlerden elde edilen soğuk sıkım natürel sızma zeytinyağı.',
    brandId: 1,
    brand: { id: 1, name: 'Tariş', slug: 'taris', description: null, websiteUrl: null, logoUrl: null },
    categoryId: 2,
    category: null,
    variants: [
        {
            id: 101,
            price: 299.9,
            compareAtPrice: null,
            stock: 50,
            barcode: '8691234567890',
            sku: 'ZYT-001',
            thumbnails: [
                {
                    id: 1,
                    url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
                    alt: 'Zeytinyağı',
                },
            ],
            options: [],
        },
    ],
    previewVideoId: null,
    status: 1,
    badge: null,
    rating: 4.8,
    reviewCount: 234,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
};

const discountedProduct: Product = {
    ...baseProduct,
    id: 2,
    name: 'Premium Türk Kahvesi 500g',
    slug: 'premium-turk-kahvesi-500g',
    brand: { id: 2, name: 'Kurukahveci Mehmet Efendi', slug: 'mehmet-efendi', description: null, websiteUrl: null, logoUrl: null },
    variants: [
        {
            ...baseProduct.variants[0],
            id: 201,
            price: 189.9,
            compareAtPrice: 249.9,
            thumbnails: [
                {
                    id: 2,
                    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400',
                    alt: 'Türk Kahvesi',
                },
            ],
        },
    ],
    badge: 'Çok Satan',
    rating: 4.9,
    reviewCount: 1256,
};

const outOfStockProduct: Product = {
    ...baseProduct,
    id: 3,
    name: 'Antep Fıstığı - Kavrulmuş 500g',
    slug: 'antep-fistigi-kavrulmus-500g',
    brand: { id: 3, name: 'Gaziantep Fıstıkçısı', slug: 'gaziantep-fistik', description: null, websiteUrl: null, logoUrl: null },
    variants: [
        {
            ...baseProduct.variants[0],
            id: 301,
            price: 449.9,
            stock: 0,
            thumbnails: [
                {
                    id: 3,
                    url: 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=400',
                    alt: 'Antep Fıstığı',
                },
            ],
        },
    ],
    rating: 4.7,
    reviewCount: 89,
};

const meta: Meta<typeof ProductCard> = {
    title: 'Molecules/ProductCard',
    component: ProductCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        priority: {
            control: 'boolean',
            description: 'Whether to prioritize image loading',
        },
        locale: {
            control: 'select',
            options: ['tr', 'en'],
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '280px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        product: baseProduct,
        locale: 'tr',
    },
};

export const WithDiscount: Story = {
    args: {
        product: discountedProduct,
        locale: 'tr',
    },
};

export const OutOfStock: Story = {
    args: {
        product: outOfStockProduct,
        locale: 'tr',
    },
};

export const EnglishLocale: Story = {
    args: {
        product: baseProduct,
        locale: 'en',
    },
};

export const HighPriority: Story = {
    args: {
        product: baseProduct,
        locale: 'tr',
        priority: true,
    },
};

export const NoRating: Story = {
    args: {
        product: {
            ...baseProduct,
            rating: undefined,
            reviewCount: undefined,
        },
        locale: 'tr',
    },
};

export const NoBrand: Story = {
    args: {
        product: {
            ...baseProduct,
            brand: null,
            brandId: null,
        },
        locale: 'tr',
    },
};
