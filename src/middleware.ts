import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const cookieExists = request.cookies.get('nextauth.token');
    if (!cookieExists && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect('http://localhost:3000/login');;
        
    }
}

export const config = {
    matcher: '/admin/:path*',
};