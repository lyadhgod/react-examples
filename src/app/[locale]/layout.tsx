import { Metadata } from "next"
import { Inter } from "next/font/google";
import { getDictionary, locales } from "~/dictionaries"

export const runtime = 'edge'

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

type Params = Awaited<ReturnType<typeof generateStaticParams>>[0]

export async function generateMetadata({ params }: Readonly<{
    params: Params
}>): Promise<Metadata> {
    const dict = await getDictionary(params.locale)
  
    return {
        title: dict.title,
        description: dict.description
    }
}
   
const inter = Inter({ subsets: ["latin"] })

export default function Layout({ children, params }: Readonly<{
    children: React.ReactNode,
    params: Params
}>) {
    return (
        <html lang={params.locale}>
            <body className={inter.className}>{children}</body>
        </html>
    )
}