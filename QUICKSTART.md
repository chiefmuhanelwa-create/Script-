# ⚡ QUICKSTART - Get Running in 5 Minutes

## 🎯 For Developers Who Want to Test NOW

### 1️⃣ Install Dependencies (2 minutes)
```bash
npm install
```

### 2️⃣ Add OpenAI API Key (1 minute)
```bash
# Create .env.local file
echo "OPENAI_API_KEY=sk-your-key-here" > .env.local
```

**Get API key:** https://platform.openai.com/api-keys

### 3️⃣ Start Server (30 seconds)
```bash
npm run dev
```

### 4️⃣ Open Browser (10 seconds)
```
http://localhost:3000
```

### 5️⃣ Test It (1 minute)
1. Click "Generate Scripts Now"
2. Enter topic: "Why African creators earn less"
3. Click "Generate Scripts"
4. Wait ~30 seconds
5. ✅ See 5 viral scripts!

---

## 🐛 Quick Fixes

### ❌ "npm install" fails
```bash
npm cache clean --force
npm install
```

### ❌ "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Failed to generate scripts"
- Check `.env.local` has valid API key
- Verify key at https://platform.openai.com/account/api-keys
- Add credits at https://platform.openai.com/account/billing

### ❌ Port 3000 in use
```bash
PORT=3001 npm run dev
```

---

## 🚀 Deploy to Vercel (2 minutes)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Add API key in dashboard
# Vercel Dashboard → Settings → Environment Variables
# Name: OPENAI_API_KEY
# Value: your-key

# 4. Redeploy
vercel --prod
```

**Done!** Live URL in 2 minutes.

---

## 📋 What You Should See

### Landing Page
- ✅ Orange "Generate Scripts Now" button
- ✅ 3 feature cards
- ✅ 6 framework cards (R×A×C×U^B, PAIDS, etc.)
- ✅ "For children's children" footer

### Generation Page
- ✅ Topic input field
- ✅ Loading spinner during generation
- ✅ 5 tabs (Instagram, TikTok, YouTube, Carousel, Thread)
- ✅ Copy/Download buttons
- ✅ Scripts with hook scores, timing, visuals

### Script Content
- ✅ 3 hook options with R×A×C×U^B scores
- ✅ SEEDS structure (Setup → Escalation → Emotion → Discovery → Summary)
- ✅ Timing markers ([0-3 SECONDS], [3-8 SECONDS], etc.)
- ✅ Visual directions
- ✅ Production notes
- ✅ Ubuntu closer: "You understand? Because you understand. For children's children."

---

## 💰 Cost Estimate

**Development/Testing:**
- 10 script generations: ~$1.20
- 100 generations: ~$12

**Production:**
- 1,000 users × 5 scripts each: ~$600/month

**Optimization:**
Use GPT-3.5-Turbo (70% cheaper) during testing:
```typescript
// app/api/generate-script/route.ts line 22
model: 'gpt-3.5-turbo'  // Instead of 'gpt-4-turbo-preview'
```

---

## 🆘 Still Stuck?

1. **Read full setup:** See SETUP.md
2. **Check README:** See README.md for detailed docs
3. **Verify all files exist:**
   ```bash
   ls -la app/api/generate-script/
   ls -la components/
   ls -la lib/
   ```
4. **Check git branch:**
   ```bash
   git branch
   # Should show: claude/build-viral-script-generator-Dno7H
   ```

---

🌍 **For children's children.**

*Need the full guide? See SETUP.md*
