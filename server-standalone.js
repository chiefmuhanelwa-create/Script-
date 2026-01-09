#!/usr/bin/env node

/**
 * NOCHILL Viral Script Generator - Standalone Server
 * No dependencies required - uses only Node.js built-ins
 * Run with: node server-standalone.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Load environment variables
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    });
  } catch (err) {
    console.error('⚠️  Warning: .env.local not found. API key must be set.');
  }
}

loadEnv();

// Master prompt with all NOCHILL frameworks
const MASTER_PROMPT = fs.readFileSync(path.join(__dirname, 'lib', 'prompts.ts'), 'utf8')
  .split('export const MASTER_PROMPT = `')[1]
  .split('`')[0];

// Claude API call using native fetch
async function callClaudeAPI(topic) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not found in environment variables');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 4096, // Haiku max is 4096
      temperature: 0.8,
      system: MASTER_PROMPT,
      messages: [{
        role: 'user',
        content: topic
      }]
    })
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.log('Full Claude API error:', JSON.stringify(error, null, 2));

    if (response.status === 401) {
      throw {
        status: 401,
        message: 'Invalid API Key',
        details: 'Your Claude API key is invalid or has been revoked',
        fix: 'Get a new API key from https://console.anthropic.com/settings/keys'
      };
    } else if (response.status === 403) {
      throw {
        status: 403,
        message: 'Insufficient Credits',
        details: 'Your Anthropic account does not have enough credits',
        fix: 'Add credits at https://console.anthropic.com/settings/billing (minimum $10)'
      };
    } else if (response.status === 429) {
      throw {
        status: 429,
        message: 'Rate Limit Exceeded',
        details: 'Too many requests to Claude API',
        fix: 'Wait 60 seconds and try again'
      };
    }

    throw {
      status: response.status,
      message: 'Claude API Error',
      details: error.error?.message || error.message || JSON.stringify(error) || response.statusText,
      fix: 'Check the error details and try again'
    };
  }

  const data = await response.json();
  return data.content[0].text;
}

// Parse Claude response into scripts
function parseScripts(rawResponse) {
  const sections = rawResponse.split(/={40,}/);
  const scripts = [];

  const platformMap = {
    'INSTAGRAM REEL': { platform: 'Instagram Reel', duration: '60s' },
    'TIKTOK': { platform: 'TikTok', duration: '15-30s' },
    'YOUTUBE SHORT': { platform: 'YouTube Short', duration: '3min' },
    'INSTAGRAM CAROUSEL': { platform: 'Instagram Carousel', duration: '10 slides' },
    'TWITTER THREAD': { platform: 'Twitter Thread', duration: '10 tweets' }
  };

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    for (const [key, value] of Object.entries(platformMap)) {
      if (trimmed.toUpperCase().includes(key)) {
        scripts.push({
          platform: value.platform,
          duration: value.duration,
          content: trimmed
        });
        break;
      }
    }
  }

  if (scripts.length === 0) {
    // Fallback: create one script with all content
    scripts.push({
      platform: 'Generated Script',
      duration: 'Various',
      content: rawResponse
    });
  }

  return scripts;
}

// Serve static files
function serveStaticFile(res, filePath, contentType) {
  fs.readFile(filePath, 'utf8', (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

// Create server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint
  if (pathname === '/api/generate-script' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const { topic } = JSON.parse(body);

        if (!topic) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Topic is required',
            details: 'Please provide a topic to generate scripts',
            fix: 'Enter a topic in the input field'
          }));
          return;
        }

        console.log('🚀 Generating scripts for:', topic);

        const rawResponse = await callClaudeAPI(topic);
        const scripts = parseScripts(rawResponse);

        console.log('✅ Generated', scripts.length, 'scripts');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          scripts,
          rawResponse
        }));

      } catch (error) {
        console.error('❌ Error:', error);

        res.writeHead(error.status || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          error: error.message || 'Failed to generate scripts',
          details: error.details || error.toString(),
          fix: error.fix || 'Check your configuration and try again',
          status: error.status || 500
        }));
      }
    });

    return;
  }

  // Serve HTML page
  if (pathname === '/' || pathname === '/generate') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(fs.readFileSync(path.join(__dirname, 'standalone.html'), 'utf8'));
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 NOCHILL Viral Script Generator');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log(`✅ Server running on: http://localhost:${PORT}`);
  console.log('');
  console.log('📝 API Key:', process.env.ANTHROPIC_API_KEY ? '✅ Found' : '❌ Missing');
  console.log('');
  console.log('🌐 Open your browser and visit:');
  console.log(`   http://localhost:${PORT}`);
  console.log('');
  console.log('Press Ctrl+C to stop the server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});
