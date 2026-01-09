#!/bin/bash

# NOCHILL Viral Script Generator - Setup Verification Script
# Run this to verify your setup is correct before starting the dev server

echo "🔍 NOCHILL Setup Verification"
echo "=============================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js found: $NODE_VERSION"

    # Check if version is >= 18
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -lt 18 ]; then
        echo -e "${YELLOW}⚠${NC} Warning: Node.js 18+ recommended (you have v$NODE_MAJOR)"
        warnings=$((warnings+1))
    fi
else
    echo -e "${RED}✗${NC} Node.js not found. Install from https://nodejs.org"
    errors=$((errors+1))
fi
echo ""

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm found: $NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    errors=$((errors+1))
fi
echo ""

# Check node_modules
echo "📚 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules directory exists"

    # Check critical packages
    CRITICAL_PACKAGES=("next" "react" "openai" "typescript")
    for package in "${CRITICAL_PACKAGES[@]}"; do
        if [ -d "node_modules/$package" ]; then
            echo -e "${GREEN}  ✓${NC} $package installed"
        else
            echo -e "${RED}  ✗${NC} $package missing"
            errors=$((errors+1))
        fi
    done
else
    echo -e "${RED}✗${NC} node_modules not found"
    echo -e "${YELLOW}  →${NC} Run: npm install"
    errors=$((errors+1))
fi
echo ""

# Check .env.local
echo "🔑 Checking environment variables..."
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} .env.local file exists"

    # Check if it contains OPENAI_API_KEY
    if grep -q "OPENAI_API_KEY" .env.local; then
        # Check if it's not the placeholder
        if grep -q "sk-your-" .env.local; then
            echo -e "${YELLOW}⚠${NC} OPENAI_API_KEY appears to be placeholder"
            echo -e "${YELLOW}  →${NC} Replace with real API key from https://platform.openai.com/api-keys"
            warnings=$((warnings+1))
        else
            KEY_VALUE=$(grep "OPENAI_API_KEY" .env.local | cut -d'=' -f2)
            if [[ $KEY_VALUE == sk-* ]]; then
                echo -e "${GREEN}  ✓${NC} OPENAI_API_KEY looks valid"
            else
                echo -e "${RED}  ✗${NC} OPENAI_API_KEY doesn't start with 'sk-'"
                errors=$((errors+1))
            fi
        fi
    else
        echo -e "${RED}  ✗${NC} OPENAI_API_KEY not found in .env.local"
        errors=$((errors+1))
    fi
else
    echo -e "${RED}✗${NC} .env.local file not found"
    echo -e "${YELLOW}  →${NC} Create it: cp .env.local.example .env.local"
    echo -e "${YELLOW}  →${NC} Then add your OpenAI API key"
    errors=$((errors+1))
fi
echo ""

# Check critical files
echo "📄 Checking project files..."
CRITICAL_FILES=(
    "package.json"
    "next.config.js"
    "tsconfig.json"
    "tailwind.config.ts"
    "app/page.tsx"
    "app/layout.tsx"
    "app/globals.css"
    "app/generate/page.tsx"
    "app/api/generate-script/route.ts"
    "lib/prompts.ts"
    "components/TopicInput.tsx"
    "components/ScriptOutput.tsx"
    "components/CopyButton.tsx"
    "components/DownloadButton.tsx"
    "components/LoadingState.tsx"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}  ✓${NC} $file"
    else
        echo -e "${RED}  ✗${NC} $file missing"
        errors=$((errors+1))
    fi
done
echo ""

# Check git branch
echo "🌿 Checking git branch..."
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$CURRENT_BRANCH" ]; then
    echo -e "${GREEN}✓${NC} Current branch: $CURRENT_BRANCH"
    if [[ $CURRENT_BRANCH != *"claude/build-viral-script-generator"* ]]; then
        echo -e "${YELLOW}⚠${NC} Not on the main feature branch"
        echo -e "${YELLOW}  →${NC} Expected: claude/build-viral-script-generator-*"
        warnings=$((warnings+1))
    fi
else
    echo -e "${YELLOW}⚠${NC} Not in a git repository"
    warnings=$((warnings+1))
fi
echo ""

# Port availability check
echo "🔌 Checking port availability..."
if command -v lsof &> /dev/null; then
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠${NC} Port 3000 is in use"
        echo -e "${YELLOW}  →${NC} Stop the process or use: PORT=3001 npm run dev"
        warnings=$((warnings+1))
    else
        echo -e "${GREEN}✓${NC} Port 3000 is available"
    fi
else
    echo -e "${YELLOW}⚠${NC} Cannot check port (lsof not available)"
fi
echo ""

# Summary
echo "=============================="
echo "📊 VERIFICATION SUMMARY"
echo "=============================="
echo ""

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✓ ALL CHECKS PASSED!${NC}"
    echo ""
    echo "You're ready to start the development server:"
    echo "  npm run dev"
    echo ""
    echo "Then open: http://localhost:3000"
    echo ""
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠ WARNINGS FOUND: $warnings${NC}"
    echo ""
    echo "The app should still work, but review warnings above."
    echo ""
    echo "To start anyway:"
    echo "  npm run dev"
    echo ""
    exit 0
else
    echo -e "${RED}✗ ERRORS FOUND: $errors${NC}"
    echo -e "${YELLOW}⚠ WARNINGS: $warnings${NC}"
    echo ""
    echo "Fix the errors above before running the app."
    echo ""
    echo "Common fixes:"
    echo "  1. Install dependencies: npm install"
    echo "  2. Create .env.local: cp .env.local.example .env.local"
    echo "  3. Add OpenAI API key to .env.local"
    echo ""
    exit 1
fi
