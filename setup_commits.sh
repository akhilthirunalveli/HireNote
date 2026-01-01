#!/bin/bash

# Reset Git Repository
rm -rf .git
git init
git branch -M main

# 1. Project Setup
# Excluding tailwind.config.ts as it is not present (Tailwind v4 / CSS import)
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs .gitignore types/ lib/utils.ts lib/constants.ts
git commit -m "fix: Initial project setup, configuration, and types"

# 2. Auth, Core UI & Public Assets
git add middleware.ts lib/supabase/ app/globals.css app/layout.tsx components/ui/ hooks/useTheme.tsx hooks/useUser.ts app/icon.svg public/
git commit -m "feat(ui): Setup design system, themes, auth middleware, and assets"

# 3. AI Service Integration
git add lib/ai/ app/actions.ts types/ai.ts app/api/
git commit -m "feat(ai): Implement Gemini integration, server actions, and API routes"

# 4. Dashboard Shell & Components
git add app/dashboard/layout.tsx components/dashboard/
git commit -m "feat(dashboard): Create responsive dashboard layout, sidebar, and nav"

# 5. Templates System (Browsing, CRUD, Parsing)
git add components/template/ app/dashboard/page.tsx app/dashboard/loading.tsx app/dashboard/browse/ app/dashboard/templates/ hooks/useTemplates.ts lib/db/ lib/template/ types/template.ts lib/reward-templates.ts
git commit -m "feat(templates): Core template management, browsing, creation, and parsing logic"

# 6. Settings & API Key
git add app/dashboard/settings/ app/dashboard/api-key/
git commit -m "feat(settings): Add user settings and BYO API key support"

# 7. Landing Page
git add app/page.tsx components/home/
git commit -m "feat(landing): Home page with starry background, scroller, and view transitions"

# 8. Authentication Pages
git add app/auth/
git commit -m "feat(auth): Add login and auth callback routes"

# 9. Documentation
git add README.md idea.txt .vscode/
git commit -m "docs: Add project documentation, ideas, and VSCode config"

# 10. Final Cleanup
git add .
git commit -m "chore: Add any remaining files (migrations, etc.)"

echo "✅ Git history reconstructed successfully!"
