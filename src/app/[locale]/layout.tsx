import { Inter } from "next/font/google";
import { Dictionary, getDictionary, localeNames, locales } from "~/dictionaries"

export const runtime = 'edge'

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

type Params = Awaited<ReturnType<typeof generateStaticParams>>[0]

export async function generateMetadata({ params }: Readonly<{
    params: Params
}>) {
    const dict = await getDictionary(params.locale)
  
    return {
        title: dict.title,
        description: dict.description
    }
}
   
const inter = Inter({ subsets: ["latin"] })

export default async function Layout({ children, params }: Readonly<{
    children: React.ReactNode,
    params: Params
}>) {
    const dict = await getDictionary(params.locale);

    return (
        <html lang={params.locale}>
            <body className={inter.className}>
                <Root dict={dict}>
                    {children}
                </Root>
            </body>
        </html>
    )
}

function Root({ children, dict }: Readonly<{
    children: React.ReactNode,
    dict: Dictionary
}>) {
    return (
        <div className="w-screen h-screen flex">
            <aside className="flex-none h-full"></aside>
            <main className="flex-1 h-full">{children}</main>
            <aside className="flex-none h-full">
                <SidebarRight dict={dict}/>
            </aside>
        </div>
    )   
}

function SidebarRight({ dict }: Readonly<{
    dict: Dictionary
}>) {
    return (
        <div className="p-1 flex flex-column gap-1">
            <div className="dropdown dropdown-left">
                <div tabIndex={0} role="button" className="btn">
                    <span className="material-symbols-outlined">translate</span>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    {
                        localeNames.map((locale, index) => (
                            <li key={index}><a>{locale}</a></li>
                        ))
                    }
                </ul>
            </div>

            <button className="btn">
                <label className="swap swap-rotate">
                    <input type="checkbox" className="theme-controller" value="dark" />

                    <span className="material-symbols-outlined swap-off">light_mode</span>
                    <span className="material-symbols-outlined swap-on">dark_mode</span>
                </label>
            </button>
        </div>
    )
}
