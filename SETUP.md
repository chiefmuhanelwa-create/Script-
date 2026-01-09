# 🚀 Quick Setup Guide - NOCHILL Viral Script Generator

## ⚠️ Important: Setup Required on Your Local Machine

The application code is complete and pushed to your repository, but you need to set it up on your local machine to run it.

## 📋 Step-by-Step Setup

### 1. Clone the Repository (if not already done)

```bash
git clone <your-repo-url>
cd Script-
git checkout claude/build-viral-script-generator-Dno7H
```

### 2. Install Dependencies

```bash
npm install
```

**Expected packages to be installed:**
- next@^14.0.0
- react@^18.2.0
- react-dom@^18.2.0
- openai@^4.20.0
- typescript@^5.3.0
- tailwindcss@^3.3.0
- And development dependencies

**Installation time:** ~2-3 minutes

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit the file and add your OpenAI API key
nano .env.local  # or use your preferred editor
```

Add this line with your actual API key:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Get your OpenAI API key:**
1. Visit https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (you won't be able to see it again!)
5. Paste it into `.env.local`

### 4. Start the Development Server

```bash
npm run dev
```

You should see:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### 5. Open the App

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the landing page with "NOCHILL Viral Script Generator"!

### 6. Test Script Generation

1. Click "Generate Scripts Now" or go to http://localhost:3000/generate
2. Enter a topic (e.g., "Why African creators earn less")
3. Click "Generate Scripts"
4. Wait ~30 seconds
5. View your 5 platform-optimized scripts!

---

## 🐛 Troubleshooting

### Issue: "npm install" fails

**Solution 1:** Clear npm cache
```bash
npm cache clean --force
npm install
```

**Solution 2:** Delete package-lock.json and try again
```bash
rm package-lock.json
npm install
```

**Solution 3:** Use yarn instead
```bash
npm install -g yarn
yarn install
yarn dev
```

### Issue: "Cannot find module 'next'"

**Solution:** Ensure dependencies are installed
```bash
npm install
```

### Issue: "Failed to generate scripts" error

**Possible causes:**

1. **Invalid API Key**
   - Check your `.env.local` file
   - Verify key starts with `sk-`
   - No spaces or quotes around the key

2. **No API Credits**
   - Visit https://platform.openai.com/account/billing
   - Add payment method if needed
   - Check your usage limits

3. **Network Issues**
   - Check your internet connection
   - Try again in a few moments

### Issue: Port 3000 already in use

**Solution:** Use a different port
```bash
PORT=3001 npm run dev
```

Then visit http://localhost:3001

### Issue: "Module not found: Can't resolve '@/...'"

**Solution:** Check tsconfig.json has correct paths
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: Tailwind styles not loading

**Solution 1:** Rebuild
```bash
rm -rf .next
npm run dev
```

**Solution 2:** Check app/globals.css imports Tailwind
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended)

1. Push your code to GitHub:
```bash
git push origin claude/build-viral-script-generator-Dno7H
```

2. Visit https://vercel.com
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key
6. Click "Deploy"

**Result:** Live URL in ~2 minutes!

### Option 2: Railway

1. Visit https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variable: `OPENAI_API_KEY`
5. Click "Deploy"

### Option 3: Render

1. Visit https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Add environment variable: `OPENAI_API_KEY`
5. Click "Create Web Service"

---

## 📊 Expected Costs

### Development (Local Testing)

**OpenAI API Usage:**
- Per script generation: ~$0.12
- 10 tests/day: ~$1.20/day
- 30-day testing: ~$36

**Tip:** Start with GPT-3.5-Turbo to save costs during testing:
```typescript
// In app/api/generate-script/route.ts, change:
model: 'gpt-3.5-turbo'  // Instead of 'gpt-4-turbo-preview'
```
**Cost savings:** ~70% cheaper (~$0.04 per generation)

### Production (Live App)

**Vercel/Railway/Render:**
- Free tier: 0-100K requests/month
- Paid: Starts at $20/month

**OpenAI API:**
- 100 generations/month: ~$12
- 1,000 generations/month: ~$120
- 10,000 generations/month: ~$1,200

**Recommended:** Implement rate limiting or user credits

---

## ✅ Verification Checklist

Before considering setup complete, verify:

- [ ] `npm install` completed without errors
- [ ] `.env.local` created with valid OpenAI API key
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads the landing page
- [ ] Can navigate to /generate page
- [ ] Test script generation works (enter topic → get 5 scripts)
- [ ] Scripts display properly in tabs
- [ ] Copy button works
- [ ] Download button works
- [ ] All 5 script types are generated (Reel, TikTok, YouTube, Carousel, Thread)

---

## 🎯 What You Should See

### Landing Page (/)
- NOCHILL branding
- "Generate Scripts Now" button
- Features grid (3 cards)
- "How It Works" section (3 steps)
- "Powered by NOCHILL Frameworks" (6 framework cards)
- Ubuntu footer message

### Generation Page (/generate)
- Topic input field
- "Generate Scripts" button
- Loading animation during generation
- Tabbed interface with 5 tabs:
  1. Instagram Reel (📱)
  2. TikTok (🎵)
  3. YouTube (▶️)
  4. Carousel (📊)
  5. Thread (🐦)
- Copy and Download buttons for each script
- Scripts formatted with:
  - Hook options with R×A×C×U^B scores
  - Timing markers
  - Visual directions
  - Production notes
  - Psychology breakdowns
  - Ubuntu closer: "You understand? Because you understand. For children's children."

---

## 🔑 OpenAI API Key Setup (Detailed)

### Step 1: Create OpenAI Account
1. Go to https://platform.openai.com
2. Click "Sign Up" (or "Log In" if you have an account)
3. Complete registration

### Step 2: Add Payment Method
1. Go to https://platform.openai.com/account/billing
2. Click "Add payment method"
3. Enter credit card details
4. Add minimum $5 credit (recommended: $20 for testing)

### Step 3: Create API Key
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Name it "NOCHILL Script Generator"
4. Copy the key immediately (starts with `sk-`)
5. Store it securely (you can't view it again!)

### Step 4: Add to .env.local
```env
OPENAI_API_KEY=sk-proj-abc123...xyz789
```

**Security Note:**
- Never commit `.env.local` to git (already in .gitignore)
- Never share your API key publicly
- If exposed, delete it and create a new one

---

## 📞 Need Help?

If you encounter issues:

1. **Check the logs:** Look at the terminal where `npm run dev` is running
2. **Check browser console:** Press F12 → Console tab
3. **Verify API key:** Test at https://platform.openai.com/playground
4. **Check OpenAI status:** https://status.openai.com

---

## 🎉 Success!

Once you see scripts generating with:
- ✅ 3 hook options with viral scores
- ✅ Complete SEEDS structure
- ✅ African creator context
- ✅ Shadow fears integration
- ✅ Ubuntu closer

**You're ready to create viral content!**

🌍 **For children's children.**

---

*NOCHILL PTY LTD | Powered by PAIDS, SEEDS, 4E, R×A×C×U^B, Ubuntu*
