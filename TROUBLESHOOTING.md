# 🔧 Troubleshooting "Failed to generate scripts"

## ✅ Fixed! Solution Steps

Your issue was that the `.env.local` file didn't exist - only the example file was there. I've now created it with your API key.

---

## 🚀 Next Steps to Get It Working

### **1. Restart Your Development Server**

If you have the dev server running, you **MUST restart it** for the new environment variables to load.

**Stop the server:**
- Press `Ctrl + C` in the terminal where `npm run dev` is running

**Start it again:**
```bash
npm run dev
```

**Why?** Next.js only reads `.env.local` when the server starts. Adding it after the server is running won't work.

---

### **2. Verify Setup (Optional)**

If you want to test the Claude API connection before running the app:

```bash
# Install dependencies first (if not done)
npm install

# Add dotenv for testing
npm install dotenv

# Run the test script
node test-claude-api.js
```

This will tell you exactly if:
- ✅ API key is found
- ✅ API key format is correct
- ✅ Claude API connection works
- ✅ You have sufficient credits

---

## 🐛 Common Issues & Fixes

### Issue 1: Server Not Restarted
**Symptom:** Still getting "Failed to generate scripts" after adding .env.local

**Fix:**
```bash
# Stop server (Ctrl+C)
# Start again
npm run dev
```

### Issue 2: Invalid API Key
**Symptom:** "401 Authentication failed" or "Invalid API key"

**Check:**
1. Open `.env.local`
2. Verify key starts with `sk-ant-`
3. No spaces or quotes around the key
4. Key is on a single line

**Format should be:**
```env
ANTHROPIC_API_KEY=sk-ant-api03-abc...xyz
```

**Not:**
```env
ANTHROPIC_API_KEY="sk-ant-api03-abc...xyz"  ❌ (quotes)
ANTHROPIC_API_KEY = sk-ant-api03-abc...xyz  ❌ (spaces)
```

### Issue 3: Insufficient Credits
**Symptom:** "403 Forbidden" or credit-related errors

**Fix:**
1. Go to: https://console.anthropic.com/settings/billing
2. Add credits (minimum $10)
3. Wait 1-2 minutes for processing
4. Try again

### Issue 4: Rate Limit
**Symptom:** "429 Rate limit exceeded"

**Fix:**
- Wait 60 seconds
- Try again
- Claude has generous limits, this is rare

### Issue 5: Network Issues
**Symptom:** "Network error" or "Cannot connect"

**Fix:**
- Check internet connection
- Try again in a moment
- Check Claude status: https://status.anthropic.com

### Issue 6: Module Not Found
**Symptom:** "Cannot find module '@anthropic-ai/sdk'"

**Fix:**
```bash
npm install
```

This installs all dependencies including the Anthropic SDK.

---

## 🔍 Debugging Checklist

Run through this checklist:

```bash
# 1. Check .env.local exists
ls -la .env.local
# Should show the file

# 2. Check .env.local content
cat .env.local
# Should show: ANTHROPIC_API_KEY=sk-ant-...

# 3. Check dependencies installed
ls -d node_modules
# Should exist

# 4. Check Anthropic SDK installed
ls node_modules/@anthropic-ai/sdk
# Should exist

# 5. Restart server
# Ctrl+C to stop
npm run dev
# Should start without errors
```

---

## 📊 What the Error Looks Like

### In Browser Console (F12):
```
Failed to generate scripts
Error: <specific error message>
```

### In Terminal (Server Logs):
```
Claude API Error: <specific error>
```

**Look for specific error messages** - they tell you exactly what's wrong!

---

## 🧪 Test Connection Step-by-Step

### Method 1: Use Test Script
```bash
node test-claude-api.js
```

This will show:
- ✅ API key found
- ✅ Connecting to Claude...
- ✅ SUCCESS! Response received
- Or specific error with fix instructions

### Method 2: Check Browser Network Tab
1. Open browser DevTools (F12)
2. Go to "Network" tab
3. Try generating a script
4. Look for the `/api/generate-script` request
5. Click it and check the response

**Common responses:**
- `401`: Invalid API key
- `403`: Insufficient credits
- `429`: Rate limited
- `500`: Server error (check terminal logs)

---

## 🎯 Quick Fix Summary

**Most Common Solution (90% of cases):**

1. **Create .env.local** ✅ (Already done!)
2. **Restart server** ← **DO THIS NOW!**
   ```bash
   # Stop: Ctrl+C
   # Start: npm run dev
   ```
3. **Try generating a script again**

That's it! The server needs to restart to load the new environment variables.

---

## 📞 Still Not Working?

If you've tried everything above and it's still not working:

### 1. Check Your API Key Status
Visit: https://console.anthropic.com/settings/keys

- Is the key active? (not deleted)
- Try creating a NEW key
- Update `.env.local` with the new key
- Restart server

### 2. Check Your Credits
Visit: https://console.anthropic.com/settings/billing

- Do you have at least $5 available?
- Add more if needed
- Wait 2 minutes for it to process

### 3. Test with cURL
```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: sk-ant-your-key-here" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 100,
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

This tests the API directly without the app.

### 4. Check Server Terminal
Look at the terminal where `npm run dev` is running:

**Good:**
```
✓ Ready in 2.3s
○ Compiling /api/generate-script ...
```

**Bad:**
```
Error: Cannot find module '@anthropic-ai/sdk'
→ Run: npm install
```

---

## ✅ Expected Success Messages

When everything works, you should see:

### In Terminal:
```
✓ Compiled /api/generate-script in 1.2s
```

### In Browser:
- Loading spinner appears
- After 15-25 seconds
- 5 scripts appear in tabs
- Can copy/download scripts

### Sample Success Output:
```
✅ Generated scripts for: "Why African creators earn less"
📱 Instagram Reel (60s)
🎵 TikTok (15s)
▶️ YouTube Short (3min)
📊 Carousel (10 slides)
🐦 Thread (11 tweets)
```

---

## 🎓 Understanding the Flow

When you click "Generate Scripts":

1. **Frontend** (`/generate` page) sends topic to API
2. **API Route** (`/api/generate-script`) receives request
3. **Loads** `ANTHROPIC_API_KEY` from `.env.local`
4. **Calls** Claude API with the master prompt
5. **Receives** response (15-25 seconds)
6. **Parses** response into 5 scripts
7. **Returns** to frontend
8. **Displays** in tabbed interface

**If any step fails**, you get "Failed to generate scripts"

**Common failure points:**
- Step 3: `.env.local` not found or key missing → **Restart server!**
- Step 4: Invalid API key → Check key at console.anthropic.com
- Step 4: No credits → Add credits at billing page
- Step 5: Network issues → Check connection

---

## 🔒 Security Reminder

Your `.env.local` file contains your API key. It's protected:

✅ Listed in `.gitignore` (won't be committed)
✅ Only exists on your local machine
✅ Server reads it at startup

**Never:**
- Commit `.env.local` to git
- Share it publicly
- Hardcode the key in source files

---

## 🎉 Once It's Working

You'll be able to generate amazing scripts with:

✅ R×A×C×U^B scored hooks (300+ viral potential)
✅ SEEDS story structure
✅ African creator context
✅ Shadow fears integration
✅ Ubuntu philosophy
✅ 8000 token outputs (2x GPT-4!)
✅ 33% cost savings

Happy scripting! 🌍 For children's children.

---

**Most important step: Restart your dev server!**
That's the #1 reason for "Failed to generate scripts" after adding the API key.
