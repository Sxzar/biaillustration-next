// lib/api.ts
export async function fetchAPI(query: string) {
    const apiUrl = process.env.WORDPRESS_API_URL;

    if (!apiUrl) {
        throw new Error('WORDPRESS_API_URL is not set');
    }

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }
    return json.data;
}

export async function getAllPostsFromWordPress() {
    const data = await fetchAPI(`
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              slug
              date
            }
          }
        }
      }
    `);

    return data.posts;
}

// Find out if the user is logged in
export async function checkUser() {
    const data = await fetchAPI(`
      query CheckUser {
        viewer {
          id
          name
          email
        }
      }
    `);

    return data.viewer;
}

export async function checkUserLoggedInClient() {
  try {
    const response = await fetch('/api/checkUser', {
      method: 'GET',
    });

    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await fetch('https://biaillustration.com/wp-json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    // Log the raw response text for debugging
    const responseText = await response.text();
    console.log("Raw Response Text:", responseText);

    // Check if the response can be parsed as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      throw new Error('The server response is not valid JSON. Please check the server response.');
    }

    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || 'Login failed. Please try again.');
    }
  } catch (error: any) {
    throw new Error(error.message || 'An unexpected error occurred.');
  }
}

export async function logoutUser() {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',  // It's a POST request to trigger the logout process
    });

    if (response.ok) {
      // Redirect the user to the login page after successful logout
      window.location.href = '/login';  // Redirect to login or homepage
    } else {
      console.error('Failed to log out');
    }
  } catch (error) {
    console.error('An error occurred while logging out:', error);
  }
}