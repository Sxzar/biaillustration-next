import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Parse the cookies to get the token
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' });
  }

  const jwtUrl = "https://biaillustration.com/wp-json/jwt-auth/v1/token/validate";

  try {
    const response = await fetch(jwtUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return NextResponse.json({ loggedIn: true });
    } else {
      return NextResponse.json({ loggedIn: false });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Error validating token', error: error.message }, { status: 500 });
  }
}
