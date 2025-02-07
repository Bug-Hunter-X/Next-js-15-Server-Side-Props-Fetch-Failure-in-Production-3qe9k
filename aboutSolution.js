```javascript
// pages/about.js
import fetch from 'node-fetch';

export async function getServerSideProps(context) {
  try {
    const res = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`, // Add API Key if needed
      },
      timeout: 5000, // Add a timeout
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();

    return {
      props: { data },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { data: null, error: error.message }, // Pass error to the component
    };
  }
}

export default function About({ data, error }) {
  if (error) {
    return (
      <div>
        <h1>About Page</h1>
        <p>Error fetching data: {error}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>About Page</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
```