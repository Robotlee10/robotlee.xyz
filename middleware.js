import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Intercept subdomains and map them internally to subfolders
  if (hostname.startsWith('cad.')) {
    url.pathname = `/cad${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  if (hostname.startsWith('auto.')) {
    url.pathname = `/auto${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  if (hostname.startsWith('repair.')) {
    url.pathname = `/repair${url.pathname}`;
    return NextResponse.rewrite(url);
  }
  if (hostname.startsWith('web.')) {
    url.pathname = `/web${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
