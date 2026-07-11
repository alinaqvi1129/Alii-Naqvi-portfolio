// netlify/functions/chat.js
// Serverless function — replaces chatbot_server.py for Netlify hosting.
// Receives { message, history } from the frontend and calls Mistral AI.

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const MODEL = 'mistral-small-2506';

const SYSTEM_PROMPT =
  "You are Ali Naqvi's personal AI assistant embedded in his portfolio. " +
  "Ali is a first-year Computer Science student who loves web development, " +
  "machine learning, and game development. Be friendly, concise and helpful. " +
  "Format code blocks with markdown triple-backticks.";

exports.handler = async function (event) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Handle OPTIONS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return respond(400, { error: 'Invalid JSON body' });
  }

  const message = (body.message || '').trim();
  const history = Array.isArray(body.history) ? body.history : [];

  if (!message) {
    return respond(400, { error: 'message is required' });
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return respond(500, { error: 'MISTRAL_API_KEY not configured on server' });
  }

  // Build messages array
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history
      .filter(t => t.role && t.content)
      .map(t => ({ role: t.role === 'assistant' ? 'assistant' : 'user', content: t.content })),
    { role: 'user', content: message },
  ];

  try {
    const mistralRes = await fetch(MISTRAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: MODEL, messages }),
    });

    if (!mistralRes.ok) {
      const errText = await mistralRes.text();
      console.error('Mistral API error:', mistralRes.status, errText);
      return respond(502, { error: `Mistral API error: ${mistralRes.status}` });
    }

    const data = await mistralRes.json();
    const reply = data.choices?.[0]?.message?.content || '*(empty response)*';
    return respond(200, { response: reply });

  } catch (err) {
    console.error('Function error:', err);
    return respond(500, { error: err.message || 'Internal server error' });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

function respond(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders(),
    body: JSON.stringify(body),
  };
}
