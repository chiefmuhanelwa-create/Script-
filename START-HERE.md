# 🚀 START HERE - Setup Instructions

## ⚠️ IMPORTANT: You must run this on YOUR LOCAL MACHINE

The "Failed to generate scripts" error is happening because **dependencies are not installed**. This development environment has network restrictions that prevent installing npm packages.

---

## ✅ Complete Setup Steps (5 Minutes)

### Step 1: Copy Project to Your Computer

**Option A: Download as ZIP**
1. Download this entire project folder
2. Extract it to your computer (e.g., `C:\Projects\Script-Generator` or `~/Projects/Script-Generator`)

**Option B: Clone with Git**
```bash
git clone <your-repo-url>
cd Script-
```

### Step 2: Install Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

**This will install:**
- Next.js 14
- React 18
- Anthropic SDK (Claude API)
- TypeScript
- Tailwind CSS
- All other dependencies

**Expected output:**
```
added 324 packages in 45s
```

### Step 3: Verify .env.local Exists

Check if `.env.local` file exists in the project root:

```bash
# Windows
dir .env.local

# Mac/Linux
ls -la .env.local
```

**Should show:**
```
.env.local
```

**If it doesn't exist**, create it:

```bash
# Create the file
# Windows
copy .env.local.example .env.local

# Mac/Linux
cp .env.local.example .env.local
```

**Then edit `.env.local` and add your Claude API key:**
```env
ANTHROPIC_API_KEY=sk-ant-api03-YOUR-ACTUAL-KEY-HERE
```

**Replace `sk-ant-api03-YOUR-ACTUAL-KEY-HERE` with your real API key from console.anthropic.com**

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Network:      http://192.168.1.x:3000

✓ Ready in 2.3s
```

### Step 5: Open the App

Open your browser and go to:
```
http://localhost:3000
```

You should see the NOCHILL Viral Script Generator homepage!

### Step 6: Test Script Generation

1. Click **"Start Generating"** or go to `/generate`
2. Enter a topic: `"Why African creators earn less"`
3. Click **"Generate Scripts"**
4. Wait 15-25 seconds
5. See 5 viral scripts appear!

---

## 🐛 If You Still Get Errors

### Error: "Cannot find module '@anthropic-ai/sdk'"
**Fix:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Error: "ANTHROPIC_API_KEY not found"
**Fix:**
1. Verify `.env.local` exists in project root (not in a subfolder!)
2. Check the file contains: `ANTHROPIC_API_KEY=sk-ant-...`
3. **Restart the dev server:** Press `Ctrl+C`, then run `npm run dev` again

### Error: "Invalid API Key" (401)
**Fix:**
1. Go to: https://console.anthropic.com/settings/keys
2. Create a NEW API key
3. Update `.env.local` with the new key
4. Restart dev server

### Error: "Insufficient Credits" (403)
**Fix:**
1. Go to: https://console.anthropic.com/settings/billing
2. Add at least $10 in credits
3. Wait 1-2 minutes
4. Try again

---

## 🎯 Quick Verification Checklist

Before running the app, verify:

- [ ] Project is on YOUR local computer (not a restricted environment)
- [ ] You ran `npm install` successfully
- [ ] `node_modules` folder exists (should be ~200 MB)
- [ ] `.env.local` file exists in project root
- [ ] `.env.local` contains your Claude API key
- [ ] You have internet connection
- [ ] You have at least $5 credits in Anthropic account

---

## 📁 Your Project Structure Should Look Like:

```
Script-/
├── node_modules/          ← MUST EXIST (200+ MB)
│   ├── @anthropic-ai/     ← Claude SDK
│   ├── next/
│   └── react/
├── app/
├── components/
├── lib/
├── .env.local             ← YOUR API KEY (must exist!)
├── .env.local.example
├── package.json
└── README.md
```

---

## 💡 Why This Setup is Required

The app needs these installed packages to run:
- **Next.js**: Web framework
- **Anthropic SDK**: Claude API client
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

Without `npm install`, these packages don't exist, and the app cannot start.

---

## ✅ Expected Success Flow

When everything is working:

1. **Terminal shows:**
```
✓ Ready in 2.3s
○ Compiling / ...
✓ Compiled / in 1.2s
```

2. **Browser shows:**
- NOCHILL homepage loads
- Can navigate to /generate
- Can enter topics
- Scripts generate in 15-25 seconds
- Can copy/download scripts

3. **Generated scripts include:**
- 📱 Instagram Reel (60s)
- 🎵 TikTok (15-30s)
- ▶️ YouTube Short (3min)
- 📊 Instagram Carousel (10 slides)
- 🐦 Twitter Thread (10 tweets)

---

## 🆘 Still Not Working?

If you've followed all steps and it still doesn't work:

### 1. Test Claude API Directly

Run the test script:
```bash
npm install dotenv
node test-claude-api.js
```

This will tell you exactly if:
- ✅ API key is found
- ✅ API key is valid
- ✅ You have credits
- ✅ Claude API connection works

### 2. Check Console Logs

**In Terminal (where npm run dev is running):**
Look for errors like:
```
Error: Cannot find module '@anthropic-ai/sdk'
❌ ANTHROPIC_API_KEY not found
Claude API Error: 401 Invalid API key
```

**In Browser (Press F12 → Console tab):**
Look for errors like:
```
Failed to generate scripts
Network Error
401 Unauthorized
```

### 3. Verify Your API Key

Go to: https://console.anthropic.com/settings/keys
- Is your key still active?
- Try creating a new key
- Update `.env.local` with new key
- Restart server

### 4. Check Your Credits

Go to: https://console.anthropic.com/settings/billing
- Do you have at least $5 available?
- Add more credits if needed
- Wait 2 minutes for processing

---

## 🎉 Once It Works

You'll have access to:

✅ **Claude 3.5 Sonnet** - Superior storytelling AI
✅ **8000 token outputs** - 2x longer than GPT-4
✅ **NOCHILL Frameworks** - R×A×C×U^B, PAIDS, SEEDS, 4E
✅ **African Creator Optimization** - Ubuntu philosophy, shadow fears
✅ **5 Platform Scripts** - One topic → 5 ready-to-film scripts
✅ **33% Cost Savings** - $0.10/script vs $0.15 with OpenAI

---

## 📞 Summary: Why "Failed to generate scripts" Happened

1. **Root Cause**: Dependencies not installed (`node_modules` missing)
2. **Why**: Network restrictions in development environment prevent `npm install`
3. **Solution**: Run the project on YOUR local computer
4. **Steps**: `npm install` → verify `.env.local` → `npm run dev` → test

---

🌍 **For children's children.**

*NOCHILL PTY LTD | Powered by Claude 3.5 Sonnet*
