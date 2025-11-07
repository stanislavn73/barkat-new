import {Locale, i18n} from "@/i18n-config";

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({lang: locale}))
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: Locale }>
}) {
    const {lang} = await params;

    return (
        <html lang={lang}>
            {children}
        </html>
    );
}
