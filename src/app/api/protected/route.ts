import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

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
export default async function someProtectedRoute(
  req: NextApiRequest,
  res: NextApiResponse<UserData | ErrorResponse> // Specify possible response types
) {
  // Parse cookies from the request headers
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  // If no token is found, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    // You can now use the token to make authenticated requests
    const response = await fetch('https://biaillustration.com/wp-json/wp/v2/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data: UserData = await response.json();

    // If the request was successful, return the data
    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json({ message: 'Failed to fetch user data' });
    }
  } catch (error) {
    // If something goes wrong, return a 500 status
    return res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
}
