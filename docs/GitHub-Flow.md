# GitHub Workflow — Tralytic Project

> **This document defines the standard GitHub working process for this project.  
> All contributors (including AI agents) must follow this workflow without exception.**

---

## Core Rules

| Rule | Detail |
|------|--------|
| **Development machine** | All development work is performed on the local PC only |
| **Active branch** | Always work on the `local-dev` branch |
| **Remote push target** | Push completed work to `origin/local-dev` only |
| **Production deployment** | Done manually by the project owner after testing and approval |
| **Never push to** | `main` or `master` — these are protected production branches |

---

## Branch Setup

If the `local-dev` branch does not already exist locally, create it:

```bash
# Create and switch to local-dev (first time only)
git checkout -b local-dev

# If local-dev already exists, just switch to it
git checkout local-dev
```

---

## Step-by-Step Workflow

### 1. Start a new task
```bash
# Make sure you are on local-dev and it is up to date
git checkout local-dev
git pull origin local-dev
```

### 2. Do all development work locally
- Write code, fix bugs, add features — everything happens on `local-dev`
- Commit often with clear, descriptive messages

```bash
git add <specific-files>
git commit -m "feat: describe what was changed and why"
```

### 3. Push to remote `local-dev` when the task is complete
```bash
git push origin local-dev
```

This triggers a **Vercel Preview Deployment** automatically.  
The project owner uses this preview URL to review and test the changes.

### 4. Production deployment (owner only)
- The owner tests the Vercel preview
- If approved, the owner opens a Pull Request from `local-dev` → `main`
- The owner merges the PR manually
- Vercel deploys the merged `main` branch to production

---

## What AI Agents Must Never Do

- **Never** `git push origin main`
- **Never** `git push origin master`
- **Never** merge `local-dev` into `main` programmatically
- **Never** perform any deployment action to the production environment
- **Never** open or auto-merge a Pull Request to `main` without explicit owner instruction

---

## Summary Flow Diagram

```
Local PC (local-dev)
       │
       │  git push origin local-dev
       ▼
Remote local-dev  ──►  Vercel Preview URL  ──►  Owner reviews & tests
                                                         │
                                                         │  Approved?
                                                         ▼
                                                   PR: local-dev → main
                                                         │
                                                         │  Owner merges
                                                         ▼
                                                  Remote main  ──►  Vercel Production
```

---

## Commit Message Convention

Use the following prefixes for consistency:

| Prefix | Use case |
|--------|----------|
| `feat:` | New feature or page |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring (no behaviour change) |
| `style:` | Visual / CSS / design changes only |
| `docs:` | Documentation updates |
| `chore:` | Config, dependency, or tooling changes |

---

*Last updated: 2026-05-24*
