// Quick test script to verify Claude API key works
require('dotenv').config({ path: '.env.local' });
const Anthropic = require('@anthropic-ai/sdk');

async function testClaudeAPI() {
  console.log('🔍 Testing Claude API Connection...\n');

  // Check if API key exists
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('❌ ERROR: ANTHROPIC_API_KEY not found in .env.local');
    console.log('\nMake sure you have:');
    console.log('1. Created .env.local file');
    console.log('2. Added: ANTHROPIC_API_KEY=sk-ant-your-key');
    process.exit(1);
  }

  console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');
  console.log('✅ Key format looks correct\n');

  // Try to connect to Claude API
  const anthropic = new Anthropic({ apiKey });

  try {
    console.log('📡 Sending test request to Claude API...\n');

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Say "Hello from NOCHILL Script Generator!" in one sentence.'
      }]
    });

    const response = message.content[0].type === 'text'
      ? message.content[0].text
      : '';

    console.log('✅ SUCCESS! Claude API is working!\n');
    console.log('📝 Response from Claude:');
    console.log('   ', response);
    console.log('\n🎉 Your setup is correct! The app should work now.\n');
    console.log('Next steps:');
    console.log('1. Restart your dev server: npm run dev');
    console.log('2. Open: http://localhost:3000/generate');
    console.log('3. Try generating scripts!\n');

  } catch (error) {
    console.error('❌ ERROR connecting to Claude API:\n');

    if (error.status === 401) {
      console.error('   Authentication failed!');
      console.error('   • Check your API key is correct');
      console.error('   • Visit: https://console.anthropic.com/settings/keys');
      console.error('   • Delete and create a new key if needed\n');
    } else if (error.status === 429) {
      console.error('   Rate limit exceeded!');
      console.error('   • Wait a moment and try again');
      console.error('   • Check usage: https://console.anthropic.com/settings/usage\n');
    } else if (error.message?.includes('credit')) {
      console.error('   Insufficient credits!');
      console.error('   • Add credits: https://console.anthropic.com/settings/billing');
      console.error('   • Minimum $10 recommended\n');
    } else {
      console.error('   Error:', error.message);
      console.error('   Status:', error.status);
      console.error('   Full error:', error);
    }

    process.exit(1);
  }
}

testClaudeAPI();
