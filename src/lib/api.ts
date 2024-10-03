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