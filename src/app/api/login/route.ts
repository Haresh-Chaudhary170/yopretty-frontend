import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json({ message: 'Token is required' }, { status: 400 });
        }

        // Create the response
        const response = NextResponse.json(
            { message: 'Token saved in cookie' },
            { status: 200 }
        );

        // Set the cookie
        response.cookies.set('authToken', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'serviceion',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
            sameSite: 'strict',
        });

        return response;
    } catch (error: unknown) {
        console.error('Error saving token:', error);
        if (error instanceof Error) {
            return NextResponse.json(
                { message: 'Error saving token', error: error.message }, 
                { status: 500 }
            );
        }
        return NextResponse.json(
            { message: 'Unknown error occurred' }, 
            { status: 500 }
        );
    }
}