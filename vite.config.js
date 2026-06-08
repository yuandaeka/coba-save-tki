/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

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

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from the project root.
  // The third parameter '' loads all environment variables, regardless of prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'gemini-api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/gemini', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method Not Allowed' }));
              return;
            }

            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const parsedBody = JSON.parse(body);
                const { contents } = parsedBody;

                const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

                if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ 
                    error: 'GEMINI_API_KEY is not defined in your local .env file. Please edit .env in the project root and replace YOUR_GEMINI_API_KEY_HERE with your actual Gemini API key.' 
                  }));
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
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { message: err.message } }));
              }
            });
          });
        }
      }
    ]
  }
})
