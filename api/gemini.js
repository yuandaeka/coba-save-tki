/* global process */

async function generateContentWithFallback(apiKey, contents) {
  const models = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest'
  ];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contents })
      });

      const data = await response.json();

      if (response.ok) {
        return { data, status: response.status };
      }

      const errorMsg = data.error?.message || '';
      lastError = data;

      const isOverloaded = response.status === 429 || 
                           response.status === 503 || 
                           errorMsg.toLowerCase().includes('high demand') ||
                           errorMsg.toLowerCase().includes('quota') ||
                           errorMsg.toLowerCase().includes('rate limit') ||
                           errorMsg.toLowerCase().includes('resource exhausted');
      
      if (!isOverloaded) {
        break;
      }
    } catch (err) {
      lastError = { error: { message: err.message } };
    }
  }

  throw lastError;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    const { contents } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is not set on the server.' }));
      return;
    }

    try {
      const { data, status } = await generateContentWithFallback(apiKey, contents);
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(data));
    } catch (apiError) {
      res.statusCode = apiError.error?.code || 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(apiError));
    }
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: { message: error.message } }));
  }
}
