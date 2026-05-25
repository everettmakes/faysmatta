import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (but not /admin/login or admin API auth routes)
  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isAdminApi = pathname.startsWith('/api/admin') &&
    !pathname.startsWith('/api/admin/login');

  if (isAdminPage || isAdminApi) {
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      if (isAdminPage) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
