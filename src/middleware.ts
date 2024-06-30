import { NextRequest, NextResponse } from "next/server";
import { locales } from "./dictionaries";
 
export function middleware(request: Readonly<NextRequest>) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (pathnameHasLocale) return
 
  const locale = getDefaultLocale()
  request.nextUrl.pathname = `/${locale}${pathname}`
  
  return NextResponse.redirect(request.nextUrl)
}
 
export const config = {
  matcher: [
    '/((?!_next).*)',
  ],
}

function getDefaultLocale(): typeof locales[0] {
    return "en-US"
}
  