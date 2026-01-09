import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { MASTER_PROMPT } from '@/lib/prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { topic } = await request.json()

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required and must be a string' },
        { status: 400 }
      )
    }

    // Call OpenAI API with master prompt
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // or 'gpt-4' for best quality
      messages: [
        {
          role: 'system',
          content: MASTER_PROMPT
        },
        {
          role: 'user',
          content: topic
        }
      ],
      temperature: 0.8, // Balance between creativity and consistency
      max_tokens: 4000, // Adjust based on output length needs
    })

    const responseText = completion.choices[0].message.content

    // Parse the response into structured scripts
    const scripts = parseScriptResponse(responseText || '')

    return NextResponse.json({
      success: true,
      topic,
      scripts,
      rawResponse: responseText
    })

  } catch (error: any) {
    console.error('OpenAI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate scripts', details: error.message },
      { status: 500 }
    )
  }
}

// Helper function to parse AI response into structured data
function parseScriptResponse(response: string) {
  const scripts = []

  // Extract Instagram Reel Script
  const reelMatch = response.match(/INSTAGRAM REEL[\s\S]*?(?=TIKTOK|$)/i)
  if (reelMatch) {
    scripts.push({
      platform: 'Instagram Reel',
      duration: '60 seconds',
      content: reelMatch[0].trim()
    })
  }

  // Extract TikTok Script
  const tiktokMatch = response.match(/TIKTOK[\s\S]*?(?=YOUTUBE|$)/i)
  if (tiktokMatch) {
    scripts.push({
      platform: 'TikTok',
      duration: '15 seconds',
      content: tiktokMatch[0].trim()
    })
  }

  // Extract YouTube Script
  const youtubeMatch = response.match(/YOUTUBE SHORT[\s\S]*?(?=BONUS|CAROUSEL|$)/i)
  if (youtubeMatch) {
    scripts.push({
      platform: 'YouTube Short',
      duration: '3 minutes',
      content: youtubeMatch[0].trim()
    })
  }

  // Extract Carousel Script
  const carouselMatch = response.match(/CAROUSEL[\s\S]*?(?=TWITTER|THREAD|$)/i)
  if (carouselMatch) {
    scripts.push({
      platform: 'Instagram Carousel',
      duration: '10 slides',
      content: carouselMatch[0].trim()
    })
  }

  // Extract Twitter Thread
  const threadMatch = response.match(/TWITTER|THREAD[\s\S]*$/i)
  if (threadMatch) {
    scripts.push({
      platform: 'Twitter Thread',
      duration: '11 tweets',
      content: threadMatch[0].trim()
    })
  }

  return scripts
}
