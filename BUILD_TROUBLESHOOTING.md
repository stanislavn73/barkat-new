# Build Troubleshooting Guide

## ESLint "any" Type Errors After Updates

If you're seeing ESLint errors about `any` types after pulling the latest changes, this is likely a caching issue.

### Quick Fix

Run these commands in order:

```bash
# 1. Pull latest changes
git pull origin claude/add-translations-ru-ua-011CUtv8pQ4u9Pv5rBbRuoDd

# 2. Clear all caches
rm -rf .next node_modules

# 3. Clear lock files (if using different package manager)
rm -f package-lock.json pnpm-lock.yaml

# 4. Reinstall dependencies
npm install
# OR if using pnpm:
pnpm install

# 5. Try building again
npm run build
```

### Alternative: Use the Script

We've provided a cache clearing script:

```bash
./CACHE_CLEAR.sh
```

### Verification

To verify the files are correct, check that these commands return no results:

```bash
# Should show no results (only "company" which is false positive)
grep -n ": any" src/dictionaries/types.ts

# Should show no results
grep -n ": any" src/app/[lang]/soft/page.tsx

# ESLint should pass
npm run lint
```

## Common Issues

### 1. Package Manager Mismatch
If you're using `pnpm` but have `package-lock.json` (or vice versa), remove all lock files and reinstall.

### 2. Next.js Cache
The `.next` directory caches builds. Always remove it after pulling changes:
```bash
rm -rf .next
```

### 3. TypeScript Server
If using VS Code, restart the TypeScript server:
- Press `Cmd/Ctrl + Shift + P`
- Type "Restart TS Server"
- Select "TypeScript: Restart TS Server"

### 4. Node Modules
Sometimes `node_modules` gets corrupted. Full reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Current Status

All TypeScript and ESLint errors have been fixed in commit `3bfd152`. The codebase is clean and passes all checks:

- ✅ No `any` types
- ✅ All types properly defined
- ✅ ESLint passes locally
- ✅ TypeScript compilation succeeds

If you continue to see errors after clearing caches, please share your:
1. Package manager (npm/pnpm/yarn)
2. Node version (`node --version`)
3. Full error output
