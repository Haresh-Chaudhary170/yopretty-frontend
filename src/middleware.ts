// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || ''; // Replace with a strong secret key

// Function to decrypt data
interface UserInfo {
  isLogin: boolean;
  // Add other properties if needed
}

const decryptData = (ciphertext: string): UserInfo | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting cookie:', error);
    return null;
  }
};

export function middleware(request: NextRequest) {
  const protectedPaths = ['/dashboard'];
  const { pathname } = request.nextUrl;

  // Check if the requested path is a protected path
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // const isAuthenticated = request.cookies.get('isLogin')?.value === 'true';
    const encryptedValue = request.cookies.get('userInfo')?.value;
    const userInfo = encryptedValue? decryptData(encryptedValue) : null;
    const isAuthenticated = userInfo?.isLogin === true;


    if (!isAuthenticated) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure the matcher to apply middleware to specific paths
export const config = {
  matcher: ['/dashboard/:path*'],
};
