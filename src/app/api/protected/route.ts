import { NextRequest, NextResponse } from 'next/server';

// Define the shape of the user data returned from WordPress
interface UserData {
  id: number;
  name: string;
  username: string;
  [key: string]: any; // Additional fields can be included
}

// Define the shape of the error response
interface ErrorResponse {
  message: string;
  error?: string;
}

// Define the handler for the protected route
export async function GET(req: NextRequest) {
  // Parse cookies from the request
  const token = req.cookies.get('token')?.value;

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    // Use the token to make authenticated requests
    const response = await fetch('https://biaillustration.com/wp-json/wp/v2/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: UserData = await response.json();

    // If the request was successful, return the data
    if (response.ok) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Failed to fetch user data' }, { status: response.status });
    }
  } catch (error) {
    // If something goes wrong, return a 500 status
    return NextResponse.json({ message: 'Server error', error: (error as Error).message }, { status: 500 });
  }
}
