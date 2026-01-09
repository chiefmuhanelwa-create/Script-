#!/usr/bin/env node

// Simple test to check Claude API key validity
const fs = require('fs');

// Load API key
const envContent = fs.readFileSync('.env.local', 'utf8');
const apiKey = envContent.split('\n').find(line => line.includes('ANTHROPIC_API_KEY'))?.split('=')[1]?.trim();

console.log('Testing Claude API Key...\n');
console.log('API Key:', apiKey ? apiKey.substring(0, 20) + '...' : 'NOT FOUND');
console.log('Key length:', apiKey ? apiKey.length : 0);
console.log('\nMaking test request...\n');

// Try with different anthropic versions
async function testAPI(apiVersion, model) {
  console.log(`Testing with API version: ${apiVersion}, Model: ${model}`);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': apiVersion,
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 100,
        messages: [{ role: 'user', content: 'Say hello' }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(`❌ Error ${response.status}:`, JSON.stringify(data, null, 2));
      return false;
    } else {
      console.log('✅ Success!', data.content[0].text);
      return true;
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  }
}

async function run() {
  // Try different combinations
  const versions = ['2023-06-01', '2023-01-01'];
  const models = [
    'claude-3-opus-20240229',
    'claude-3-sonnet-20240229',
    'claude-3-haiku-20240307',
    'claude-3-5-sonnet-20240620',
    'claude-3-5-sonnet-20241022'
  ];

  for (const version of versions) {
    for (const model of models) {
      const success = await testAPI(version, model);
      if (success) {
        console.log('\n✅ WORKING COMBINATION FOUND!');
        console.log(`API Version: ${version}`);
        console.log(`Model: ${model}`);
        process.exit(0);
      }
      console.log('');
    }
  }

  console.log('\n❌ No working combination found');
  console.log('\nPossible issues:');
  console.log('1. API key is invalid or revoked');
  console.log('2. Account has insufficient credits');
  console.log('3. Account does not have model access');
  console.log('\nCheck: https://console.anthropic.com');
}

run();
