import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '../../../lib/api';
import cookie from 'cookie';

// Define the shape of the response data
type LoginResponseData = {
  success: boolean;
  user?: string;   // Optional user field for success case
  message?: string; // Optional error message field for failure
};

// Handle the POST request
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json(); // Extract username and password from the request body

    // Call the loginUser function to get the token
    const { token, user_nicename } = await loginUser(username, password);

    // Create a response object
    const response = NextResponse.json({ success: true, user: user_nicename });

    // Set the HttpOnly cookie using NextResponse.cookies.set
    response.cookies.set('token', token, {
      httpOnly: true,        // Makes the cookie HttpOnly
      secure: process.env.NODE_ENV !== 'development', // Secure only in production
      maxAge: 60 * 60 * 24 * 7,  // 1 week expiration
      sameSite: 'strict',    // Prevents CSRF attacks
      path: '/',             // Root path for the cookie
    });

    return response; // Return the response with the cookie set
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
  }
}
