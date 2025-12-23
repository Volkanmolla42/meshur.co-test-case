import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CartPageClient } from './CartPageClient';

interface CartPageProps {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({
    params,
}: CartPageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'cart' });

    return {
        title: t('title'),
    };
}

export default async function CartPage({ params }: CartPageProps) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <CartPageClient locale={locale} />;
}
