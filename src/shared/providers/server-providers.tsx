/**
 * Server Providers
 * Contains all server-side providers for i18n and other server features.
 */

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

type ServerProvidersProps = {
    children: React.ReactNode;
    locale: string;
};

/**
 * Combined Server Providers
 */
export async function ServerProviders({
    children,
    locale,
}: ServerProvidersProps) {
    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
    );
}
