# NOCHILL Viral Script Generator

An AI-powered web application that instantly generates complete, ready-to-film video scripts for content creators. Input a topic → Get 5 platform-optimized scripts in 30 seconds.

![NOCHILL Logo](https://img.shields.io/badge/NOCHILL-Tools-orange)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

## Features

- ⚡ **Instant Generation**: Get 5 complete scripts in under 30 seconds
- 🎯 **Multi-Platform**: Scripts for Instagram Reels, TikTok, YouTube, Carousel, and Twitter
- 📋 **Ready to Film**: Complete with hooks, timing markers, visual directions
- 🧠 **R×A×C×U^B Hook Scoring**: Scientific hook evaluation with viral potential scoring
- 📊 **NOCHILL Frameworks**: PAIDS, SEEDS, 4E Evolution, and Shadow Fears integration
- 🌍 **African Creator Context**: Optimized for African content creators with local insights
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- 💾 **Copy & Download**: Easy copy-to-clipboard and download as TXT

## Technology Stack

- **Frontend**: Next.js 14 (App Router) with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4 Turbo
- **Deployment Ready**: Vercel, Railway, or Render

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Script-
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/Script-
├── /app
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   ├── /generate
│   │   └── page.tsx               # Main generation interface
│   └── /api
│       └── /generate-script
│           └── route.ts           # API endpoint for script generation
├── /components
│   ├── TopicInput.tsx             # Topic input form
│   ├── ScriptOutput.tsx           # Script display with tabs
│   ├── LoadingState.tsx           # Loading animation
│   ├── CopyButton.tsx             # Copy to clipboard
│   └── DownloadButton.tsx         # Download as file
├── /lib
│   └── prompts.ts                 # Master AI prompt
├── /public                         # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Usage

1. **Navigate to the Generator**: Visit `/generate` or click "Generate Scripts Now" on the homepage
2. **Enter Your Topic**: Type in any content idea (e.g., "How to get brand deals")
3. **Get Scripts**: Receive 5 platform-optimized scripts instantly
4. **Copy or Download**: Use the buttons to copy scripts or download as TXT files

## Platform Scripts

Each generation includes:

1. **60-second Instagram Reel** - Full viral script with hooks
2. **15-second TikTok** - Condensed high-impact version
3. **3-minute YouTube Short** - Expanded educational content
4. **10-slide Carousel** - Swipeable educational format
5. **Twitter/X Thread** - 11-tweet breakdown

## NOCHILL Frameworks

This tool uses proven African creator frameworks to generate high-performing content:

### 1. R×A×C×U^B Hook Formula

Scientific hook evaluation system:

- **R = RELEVANT** (1-10): How relevant to African creators' struggles?
- **A = AWARENESS** (1-10): Matches audience awareness level
- **C = CLARITY** (1-10): Clear outcome promise
- **U = UNIQUE** (1-10): Pattern-breaking elements
- **B = BROADENED** (1-10): Universal appeal score

**Viral Score** = (R × A × C) × (U^B) | Target: 300+

### 2. PAIDS Monetization Framework

Every script aligns with revenue strategy:

- **P = Products** (40%) - Transformation demonstrations
- **A = Ads & Affiliates** (20%) - Viral engagement
- **I = Information** (25%) - Authority building, lead magnets
- **D = Deals** (10%) - Brand partnerships
- **S = Services** (5%) - Consultation bookings

### 3. SEEDS Story Structure

Proven content flow:

- **S = Setup** (0-8s) - Hook + Value Promise
- **E = Escalation** (8-25s) - 3-part Problem Breakdown
- **E = Emotion** (25-40s) - Personal Story + Discovery
- **D = Discovery** (40-65s) - Solution + Framework + Proof
- **S = Summary** (65-90s) - CTA + Retention Loop + Ubuntu Closer

### 4. African Creator Context

Scripts optimized for:

- **Low CPM Reality** - R18-R120 vs $145-R270 (75% less)
- **Infrastructure Challenges** - Load shedding, data costs
- **Cultural Intelligence** - Ubuntu philosophy, generational framing
- **Trust Building** - Acknowledges scam fatigue, shows receipts

### 5. Shadow Fears Integration

Taps into deep pain points:

- **Family Shame** - disappointment, embarrassment, failure
- **Time Anxiety** - wasted years, too late, behind
- **Imposter Syndrome** - fraud, pretending, unqualified
- **Generational Poverty** - stuck, trapped, cycle, curse
- **Permanent Failure** - ceiling, peak, hopeless, finished

### 6. Viral Scripting Principles

- **Negativity Wins** - INDIRECT negativity (attack problem, not person)
- **YOU Format** - Direct address throughout
- **Short & Simple** - 8-12 words per sentence
- **Audible Flow** - Optimized for natural speech

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key |
| `DATABASE_URL` | No | PostgreSQL connection (future feature) |
| `NEXTAUTH_URL` | No | Authentication URL (future feature) |
| `NEXTAUTH_SECRET` | No | Auth secret key (future feature) |

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
5. Deploy!

Vercel will automatically detect Next.js and configure everything.

### Deploy to Railway/Render

1. Push code to GitHub
2. Connect your repository to Railway/Render
3. Add environment variables
4. Deploy

## Cost Estimation

Using GPT-4 Turbo:

- **Per Generation**: ~$0.12
- **1,000 generations/month**: ~$120

To reduce costs:
- Use GPT-3.5-Turbo (~70% cheaper)
- Implement rate limiting
- Cache common requests

## Customization

### Modify the Master Prompt

Edit `/lib/prompts.ts` to customize:
- Script tone and style
- Output format
- Framework integration
- Brand voice

### Add New Platforms

1. Update the `tabs` array in `ScriptOutput.tsx`
2. Modify the parser in `/app/api/generate-script/route.ts`
3. Update the master prompt to generate new format

### Style Customization

- Edit `tailwind.config.ts` for theme changes
- Modify `app/globals.css` for global styles
- Update component styles in individual files

## Troubleshooting

### "Failed to generate scripts"

- Check your OpenAI API key is valid
- Ensure you have API credits
- Check network connectivity

### Build Errors

```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors

```bash
# Regenerate types
npm run dev
```

## Future Enhancements

Phase 2 features planned:

- ✅ User authentication
- ✅ Script history & favorites
- ✅ Custom brand voice training
- ✅ Team collaboration
- ✅ Analytics dashboard
- ✅ Payment integration (Stripe)
- ✅ API access for developers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: [your-email@example.com]

## Acknowledgments

Built with NOCHILL frameworks:
- **PAIDS** - Monetization framework for sustainable creator revenue
- **SEEDS** - Story structure for maximum engagement
- **4E Evolution** - Content maturity progression
- **R×A×C×U^B** - Scientific hook evaluation system
- **Shadow Fears** - Deep psychological pain points
- **Ubuntu Philosophy** - "I am because we are" - collective success

### Ubuntu Philosophy

This tool embodies Ubuntu principles - the African philosophy that emphasizes community, generosity, and collective growth. We build for "children's children" - creating generational wealth and sustainable business models that benefit entire communities, not just individuals.

**You understand? Because you understand.**

---

🌍 **Built with Ubuntu. For children's children.**

---

Created by the NOCHILL team | NOCHILL PTY LTD
