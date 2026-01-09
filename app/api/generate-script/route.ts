import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { MASTER_PROMPT } from '@/lib/prompts'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('❌ ANTHROPIC_API_KEY not found in environment variables')
      return NextResponse.json(
        {
          error: 'API key not configured',
          details: 'ANTHROPIC_API_KEY environment variable is missing. Did you restart the dev server after creating .env.local?',
          fix: 'Create .env.local file with ANTHROPIC_API_KEY, then restart: npm run dev'
        },
        { status: 500 }
      )
    }

    const { topic } = await request.json()

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required and must be a string' },
        { status: 400 }
      )
    }

    console.log('🚀 Generating scripts for topic:', topic)
    console.log('🔑 API key present:', process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No')

    // Call Claude API with master prompt
    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // Latest Claude with best storytelling
      max_tokens: 8000, // Claude can handle longer outputs
      temperature: 0.8, // Balance between creativity and consistency
      system: MASTER_PROMPT, // System prompt for context
      messages: [
        {
          role: 'user',
          content: topic
        }
      ],
    })

    console.log('✅ Received response from Claude API')

    // Extract text from Claude's response
    const responseText = message.content[0].type === 'text'
      ? message.content[0].text
      : ''

    // Parse the response into structured scripts
    const scripts = parseScriptResponse(responseText)

    console.log('✅ Parsed', scripts.length, 'scripts')

    return NextResponse.json({
      success: true,
      topic,
      scripts,
      rawResponse: responseText
    })

  } catch (error: any) {
    console.error('❌ Claude API Error:', error)

    // Detailed error handling
    let errorMessage = 'Failed to generate scripts'
    let errorDetails = error.message
    let errorFix = 'Check the error details below'
    let statusCode = 500

    if (error.status === 401) {
      errorMessage = 'Invalid API Key'
      errorDetails = 'Your Claude API key is invalid or has been revoked'
      errorFix = 'Get a new API key from https://console.anthropic.com/settings/keys'
      statusCode = 401
    } else if (error.status === 403) {
      errorMessage = 'Insufficient Credits'
      errorDetails = 'Your Anthropic account has insufficient credits'
      errorFix = 'Add credits at https://console.anthropic.com/settings/billing (minimum $10)'
      statusCode = 403
    } else if (error.status === 429) {
      errorMessage = 'Rate Limit Exceeded'
      errorDetails = 'Too many requests. Please wait a moment.'
      errorFix = 'Wait 60 seconds and try again'
      statusCode = 429
    } else if (error.message?.includes('credit')) {
      errorMessage = 'Credit Issue'
      errorDetails = error.message
      errorFix = 'Add credits at https://console.anthropic.com/settings/billing'
      statusCode = 402
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        fix: errorFix,
        status: error.status || statusCode,
        type: error.type || 'unknown'
      },
      { status: statusCode }
    )
  }
}

// Helper function to parse AI response into structured data
function parseScriptResponse(response: string) {
  const scripts = []

  // Try to split by VERSION markers first (new format)
  const versionSplit = response.split(/###\s*VERSION\s+[A-E]:/i)

  if (versionSplit.length > 1) {
    // New format with VERSION A, B, C, D, E markers

    // VERSION A: Instagram Reel (60s)
    const reelMatch = response.match(/###\s*VERSION\s+A:[\s\S]*?(?=###\s*VERSION\s+B:|$)/i)
    if (reelMatch) {
      scripts.push({
        platform: 'Instagram Reel',
        duration: '60 seconds',
        content: reelMatch[0].trim()
      })
    }

    // VERSION B: TikTok (15s)
    const tiktokMatch = response.match(/###\s*VERSION\s+B:[\s\S]*?(?=###\s*VERSION\s+C:|$)/i)
    if (tiktokMatch) {
      scripts.push({
        platform: 'TikTok',
        duration: '15 seconds',
        content: tiktokMatch[0].trim()
      })
    }

    // VERSION C: YouTube Short (3min)
    const youtubeMatch = response.match(/###\s*VERSION\s+C:[\s\S]*?(?=###\s*VERSION\s+D:|$)/i)
    if (youtubeMatch) {
      scripts.push({
        platform: 'YouTube Short',
        duration: '3 minutes',
        content: youtubeMatch[0].trim()
      })
    }

    // VERSION D: Carousel
    const carouselMatch = response.match(/###\s*VERSION\s+D:[\s\S]*?(?=###\s*VERSION\s+E:|$)/i)
    if (carouselMatch) {
      scripts.push({
        platform: 'Instagram Carousel',
        duration: '10 slides',
        content: carouselMatch[0].trim()
      })
    }

    // VERSION E: Twitter Thread
    const threadMatch = response.match(/###\s*VERSION\s+E:[\s\S]*$/i)
    if (threadMatch) {
      scripts.push({
        platform: 'Twitter Thread',
        duration: '11 tweets',
        content: threadMatch[0].trim()
      })
    }
  } else {
    // Fallback to old format parsing

    // Extract Instagram Reel Script
    const reelMatch = response.match(/INSTAGRAM REEL[\s\S]*?(?=TIKTOK|VERSION B|$)/i)
    if (reelMatch) {
      scripts.push({
        platform: 'Instagram Reel',
        duration: '60 seconds',
        content: reelMatch[0].trim()
      })
    }

    // Extract TikTok Script
    const tiktokMatch = response.match(/(?:VERSION B:|TIKTOK)[\s\S]*?(?=YOUTUBE|VERSION C|$)/i)
    if (tiktokMatch) {
      scripts.push({
        platform: 'TikTok',
        duration: '15 seconds',
        content: tiktokMatch[0].trim()
      })
    }

    // Extract YouTube Script
    const youtubeMatch = response.match(/(?:VERSION C:|YOUTUBE SHORT)[\s\S]*?(?=CAROUSEL|VERSION D|$)/i)
    if (youtubeMatch) {
      scripts.push({
        platform: 'YouTube Short',
        duration: '3 minutes',
        content: youtubeMatch[0].trim()
      })
    }

    // Extract Carousel Script
    const carouselMatch = response.match(/(?:VERSION D:|CAROUSEL)[\s\S]*?(?=TWITTER|THREAD|VERSION E|$)/i)
    if (carouselMatch) {
      scripts.push({
        platform: 'Instagram Carousel',
        duration: '10 slides',
        content: carouselMatch[0].trim()
      })
    }

    // Extract Twitter Thread
    const threadMatch = response.match(/(?:VERSION E:|TWITTER|THREAD)[\s\S]*$/i)
    if (threadMatch) {
      scripts.push({
        platform: 'Twitter Thread',
        duration: '11 tweets',
        content: threadMatch[0].trim()
      })
    }
  }

  // If no scripts were parsed, return the full response as a single script
  if (scripts.length === 0) {
    scripts.push({
      platform: 'Complete Script',
      duration: 'All versions',
      content: response
    })
  }

  return scripts
}
