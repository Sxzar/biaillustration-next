import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response object
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

  // Set the token cookie to expire immediately (clearing it)
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(0),  // Expire the cookie immediately
    path: '/',
  });

  return response;  // Return the response with the cleared cookie
}
