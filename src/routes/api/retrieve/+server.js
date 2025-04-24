// src/routes/api/retrieve/+server.js
import { json, error as kitError } from '@sveltejs/kit';

export async function POST({ request }) {
  // Grab the form data from the client
  const formData = await request.formData();

  // Forward to your HTTP service
  const res = await fetch('http://13.59.202.16/retrieve', {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    // Bubble up status to the client
    throw kitError(res.status, `Upstream error ${res.status}`);
  }

  // Return the JSON payload unchanged
  const payload = await res.json();
  return json(payload);
}
