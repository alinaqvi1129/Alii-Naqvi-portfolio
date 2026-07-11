// netlify/functions/health.js
// Simple health-check endpoint so the frontend status dot turns green.

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders(), body: '' };
  }

  return {
    statusCode: 200,
    headers: corsHeaders(),
    body: JSON.stringify({ status: 'ok', model: 'mistral-small-2506' }),
  };
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}
