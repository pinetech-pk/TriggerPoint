# Layout & Responsiveness Specification

## Document Overview

**Project:** Tralytics - Trading Analytics Platform
**Version:** 1.0
**Last Updated:** January 2026
**Purpose:** Define layout structure, component behavior, and responsiveness strategy

---

## Table of Contents

1. [Breakpoint System](#1-breakpoint-system)
2. [Layout Architecture](#2-layout-architecture)
3. [Sidebar Specification](#3-sidebar-specification)
4. [Header Specification](#4-header-specification)
5. [Footer Specification](#5-footer-specification)
6. [Main Content Area](#6-main-content-area)
7. [Admin vs User Layout](#7-admin-vs-user-layout)
8. [Z-Index Strategy](#8-z-index-strategy)
9. [Implementation Guidelines](#9-implementation-guidelines)

---

## 1. Breakpoint System

### 1.1 Defined Breakpoints

| Name | Width | Target Devices | CSS Class Prefix |
|------|-------|----------------|------------------|
| **xs** | 0 - 479px | Small phones | (default) |
| **sm** | 480px - 639px | Large phones | `sm:` |
| **md** | 640px - 767px | Small tablets | `md:` |
| **lg** | 768px - 1023px | Tablets, small laptops | `lg:` |
| **xl** | 1024px - 1279px | Laptops, desktops | `xl:` |
| **2xl** | 1280px+ | Large desktops | `2xl:` |

### 1.2 Layout Mode Thresholds

| Mode | Breakpoint | Sidebar | Header | Footer |
|------|------------|---------|--------|--------|
| **Mobile** | < 768px (lg) | Hidden + Hamburger | Compact | Hidden |
| **Tablet** | 768px - 1023px | Collapsed (icons only) | Full | Visible |
| **Desktop** | ≥ 1024px (xl) | Expanded (full width) | Full | Visible |

### 1.3 Tailwind Configuration

```typescript
// tailwind.config.ts
const config = {
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
};
```

---

## 2. Layout Architecture

### 2.1 Visual Layout Structure

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              VIEWPORT                                     │
├─────────┬────────────────────────────────────────────────────────────────┤
│         │                         HEADER                                  │
│         │  ┌──────────────────────────────────────────────────────────┐  │
│         │  │  [☰] Logo    Search...    [🔔] [User] Role Badge         │  │
│         │  └──────────────────────────────────────────────────────────┘  │
│         ├────────────────────────────────────────────────────────────────┤
│ SIDEBAR │                                                                │
│         │                      MAIN CONTENT                              │
│  [Nav]  │                                                                │
│  [Nav]  │                   (Scrollable Area)                            │
│  [Nav]  │                                                                │
│  [Nav]  │                                                                │
│         │                                                                │
│  ─────  │                                                                │
│ [Sign]  │                                                                │
│         ├────────────────────────────────────────────────────────────────┤
│         │                         FOOTER                                  │
│         │  ┌──────────────────────────────────────────────────────────┐  │
│         │  │  © 2026 Tralytics          Help  ·  Terms  ·  Privacy    │  │
│         │  └──────────────────────────────────────────────────────────┘  │
└─────────┴────────────────────────────────────────────────────────────────┘
```

### 2.2 DOM Structure

```html
<div id="app-root">
  <!-- Mobile Overlay (z-40) - Only visible when sidebar open on mobile -->
  <div class="sidebar-overlay" />

  <!-- Sidebar (z-50) - Fixed position -->
  <aside class="sidebar">
    <div class="sidebar-header">Logo</div>
    <nav class="sidebar-nav">Navigation</nav>
    <div class="sidebar-footer">Sign Out</div>
  </aside>

  <!-- Main Wrapper - Contains header, content, footer -->
  <div class="main-wrapper">
    <!-- Header (z-30) - Sticky at top -->
    <header class="header">...</header>

    <!-- Content (z-0) - Scrollable -->
    <main class="content">...</main>

    <!-- Footer (z-10) - At bottom of content flow -->
    <footer class="footer">...</footer>
  </div>
</div>
```

### 2.3 CSS Grid/Flex Strategy

```css
/* Root Layout */
#app-root {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh; /* Dynamic viewport height for mobile */
}

/* Main Wrapper */
.main-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0; /* Prevent flex blowout */
  margin-left: var(--sidebar-width);
  transition: margin-left 0.3s ease;
}

/* Content Area */
.content {
  flex: 1;
  overflow-y: auto;
  padding: var(--content-padding);
}
```

---

## 3. Sidebar Specification

### 3.1 Dimensions

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Width | 280px (overlay) | 72px (collapsed) | 256px (expanded) |
| Position | Fixed, off-canvas | Fixed | Fixed |
| Height | 100dvh | 100vh | 100vh |

### 3.2 State Behavior

```
┌─────────────────────────────────────────────────────────────────────┐
│                        SIDEBAR STATES                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  MOBILE (< 768px)                                                    │
│  ┌─────────────────────┐     ┌─────────────────────┐                │
│  │ CLOSED (default)    │     │ OPEN (overlay)      │                │
│  │                     │     │                     │                │
│  │ [Hamburger visible] │ ──▶ │ [Full sidebar]      │                │
│  │ [Sidebar hidden]    │     │ [Backdrop overlay]  │                │
│  │                     │ ◀── │ [Close on tap out]  │                │
│  └─────────────────────┘     └─────────────────────┘                │
│         Tap hamburger              Tap overlay/link                  │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TABLET (768px - 1023px)                                             │
│  ┌─────────────────────┐     ┌─────────────────────┐                │
│  │ COLLAPSED (default) │     │ EXPANDED (hover)    │                │
│  │                     │     │                     │                │
│  │ [Icons only]        │ ──▶ │ [Icons + Labels]    │                │
│  │ [72px width]        │     │ [256px width]       │                │
│  │ [Tooltips on hover] │ ◀── │ [Auto-collapse]     │                │
│  └─────────────────────┘     └─────────────────────┘                │
│         Mouse enter              Mouse leave                         │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DESKTOP (≥ 1024px)                                                  │
│  ┌─────────────────────┐     ┌─────────────────────┐                │
│  │ EXPANDED (default)  │     │ COLLAPSED (toggle)  │                │
│  │                     │     │                     │                │
│  │ [Full sidebar]      │ ──▶ │ [Icons only]        │                │
│  │ [256px width]       │     │ [72px width]        │                │
│  │                     │ ◀── │                     │                │
│  └─────────────────────┘     └─────────────────────┘                │
│         Click toggle              Click toggle                       │
│         (User preference persisted in localStorage)                  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.3 Sidebar Components

```
┌────────────────────────────────────┐
│           SIDEBAR HEADER           │  Height: 64px
│  ┌──────────────────────────────┐  │
│  │  [Logo Icon]  Tralytics      │  │  - Logo always visible
│  │               ▼ collapse btn │  │  - Text hidden when collapsed
│  └──────────────────────────────┘  │  - Collapse toggle on desktop
├────────────────────────────────────┤
│                                    │
│         NAVIGATION SECTION         │  Flex: 1 (fills space)
│                                    │
│  ┌──────────────────────────────┐  │
│  │  [📊] Dashboard              │  │
│  │  [📈] Trades                 │  │  - Active state: highlighted
│  │  [📉] Analytics              │  │  - Icons always visible
│  │  [💼] Accounts               │  │  - Labels hidden on collapse
│  │  [🎯] Strategies             │  │  - Tooltips on collapsed hover
│  │  [📥] Import                 │  │
│  │  [⚙️] Settings               │  │
│  └──────────────────────────────┘  │
│                                    │
│  ── Admin Section (if admin) ───   │  - Divider before admin nav
│                                    │
│  ┌──────────────────────────────┐  │
│  │  [👥] Users                  │  │  - Only visible to admins
│  │  [📊] Platform Metrics       │  │
│  │  [💳] Billing                │  │
│  └──────────────────────────────┘  │
│                                    │
├────────────────────────────────────┤
│          SIDEBAR FOOTER            │  Height: auto (padding)
│  ┌──────────────────────────────┐  │
│  │  [User Avatar]               │  │  - User info (expanded only)
│  │  user@email.com              │  │  - Role badge
│  │  [🚪] Sign Out               │  │  - Sign out button
│  └──────────────────────────────┘  │
└────────────────────────────────────┘
```

### 3.4 Sidebar CSS Variables

```css
:root {
  /* Sidebar dimensions */
  --sidebar-width-expanded: 256px;
  --sidebar-width-collapsed: 72px;
  --sidebar-width-mobile: 280px;

  /* Transition */
  --sidebar-transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Colors */
  --sidebar-bg: var(--color-card);
  --sidebar-border: var(--color-border);
  --sidebar-item-hover: var(--color-muted);
  --sidebar-item-active: var(--color-primary);
}
```

### 3.5 Auto-Close Behavior (Mobile)

The sidebar automatically closes when:
1. User taps the backdrop overlay
2. User taps a navigation link
3. User presses Escape key
4. Viewport resizes to tablet/desktop
5. User navigates via browser back/forward

---

## 4. Header Specification

### 4.1 Dimensions & Position

| Property | Mobile | Tablet | Desktop |
|----------|--------|--------|---------|
| Height | 56px | 64px | 64px |
| Position | Sticky (top: 0) | Sticky (top: 0) | Sticky (top: 0) |
| Width | 100% of main wrapper | 100% of main wrapper | 100% of main wrapper |

### 4.2 Header Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              HEADER                                       │
│                                                                          │
│  MOBILE (< 768px)                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  [☰]  Tralytics              [🔔]  [👤]                          │   │
│  │   ▲                            ▲     ▲                            │   │
│  │   │                            │     │                            │   │
│  │   Hamburger                  Notif  User                          │   │
│  │   (toggles sidebar)         (icon) (dropdown)                     │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  TABLET (768px - 1023px)                                                 │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Page Title          [🔍 Search...]        [🔔] [Free Trial ▾]   │   │
│  │       ▲                     ▲                  ▲       ▲          │   │
│  │       │                     │                  │       │          │   │
│  │   Dynamic title        Compact search       Notif   Role+User    │   │
│  │   from page                                        dropdown       │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  DESKTOP (≥ 1024px)                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  Page Title          [🔍 Search trades, strategies...]  [🔔] [SA]│   │
│  │  Page description                                              ▲ │   │
│  │                                                                │ │   │
│  │                                                         Role Badge   │
│  │                                                         + Dropdown   │
│  └──────────────────────────────────────────────────────────────────┘   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Header Components

| Component | Mobile | Tablet | Desktop | Behavior |
|-----------|--------|--------|---------|----------|
| Hamburger menu | ✅ | ❌ | ❌ | Opens mobile sidebar |
| Logo/Brand | ✅ | ❌ | ❌ | Only on mobile (sidebar has logo) |
| Page title | ❌ | ✅ | ✅ | Dynamic based on route |
| Page description | ❌ | ❌ | ✅ | Optional subtitle |
| Search bar | ❌ | ✅ (compact) | ✅ (full) | Global search |
| Notifications | ✅ (icon) | ✅ (icon) | ✅ (icon + badge) | Dropdown on click |
| User menu | ✅ (icon) | ✅ (icon + badge) | ✅ (full) | Profile dropdown |
| Role badge | ❌ | ✅ | ✅ | Shows subscription/role |

### 4.4 Role Badge Display

```
┌─────────────────────────────────────────────────────────────────┐
│                     ROLE BADGE VARIANTS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  SUPER ADMIN                                                     │
│  ┌──────────────────┐                                           │
│  │  👑 Super Admin  │  Color: Purple/Gold gradient              │
│  └──────────────────┘                                           │
│                                                                  │
│  WEB ADMIN                                                       │
│  ┌──────────────────┐                                           │
│  │  🛡️ Admin        │  Color: Blue                              │
│  └──────────────────┘                                           │
│                                                                  │
│  PREMIUM USER                                                    │
│  ┌──────────────────┐                                           │
│  │  ⭐ Premium      │  Color: Amber/Gold                         │
│  └──────────────────┘                                           │
│                                                                  │
│  FREE TRIAL                                                      │
│  ┌──────────────────┐                                           │
│  │  ⏱️ Trial · 12d  │  Color: Gray, shows days remaining         │
│  └──────────────────┘                                           │
│                                                                  │
│  EXPIRED                                                         │
│  ┌──────────────────┐                                           │
│  │  ⚠️ Upgrade      │  Color: Red/Orange, prominent CTA          │
│  └──────────────────┘                                           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Header CSS

```css
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  height: var(--header-height);
  background: var(--color-card);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  padding: 0 var(--content-padding);
  gap: 1rem;
}

/* Mobile adjustments */
@media (max-width: 767px) {
  .header {
    height: 56px;
    padding: 0 1rem;
  }
}
```

---

## 5. Footer Specification

### 5.1 Visibility Rules

| Viewport | Footer Visible | Behavior |
|----------|----------------|----------|
| Mobile (< 768px) | ❌ No | Hidden to maximize content space |
| Tablet (768px - 1023px) | ✅ Yes | Minimal, single line |
| Desktop (≥ 1024px) | ✅ Yes | Full footer with links |

### 5.2 Footer Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│                              FOOTER                                       │
│                                                                          │
│  TABLET (768px - 1023px)                                                 │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │  © 2026 Tralytics                              Help · Terms      │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  Height: 48px | Single row | Minimal content                             │
│                                                                          │
│  DESKTOP (≥ 1024px)                                                      │
│  ┌──────────────────────────────────────────────────────────────────┐   │
│  │                                                                   │   │
│  │  © 2026 Tralytics · All rights reserved     Help · Docs · Terms  │   │
│  │                                              Privacy · Contact    │   │
│  │                                                                   │   │
│  └──────────────────────────────────────────────────────────────────┘   │
│  Height: 64px | Can include more links                                   │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Footer Position Strategy

**CRITICAL: The footer must NOT overlap or intertwine with the sidebar.**

```css
/* Footer is INSIDE the main-wrapper, not outside */
.footer {
  /* Position in document flow, not fixed */
  position: relative;
  z-index: var(--z-footer);

  /* Dimensions */
  width: 100%;
  min-height: var(--footer-height);

  /* Ensure it stays within main content area */
  margin-top: auto; /* Push to bottom of flex container */

  /* Styling */
  background: var(--color-card);
  border-top: 1px solid var(--color-border);
  padding: 1rem var(--content-padding);
}

/* Main wrapper must be flex column for footer push */
.main-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1; /* Takes remaining space, pushing footer down */
}
```

### 5.4 Footer Boundary Rules

1. **Footer is a child of main-wrapper**, not a sibling of sidebar
2. **Footer width** = viewport width - sidebar width
3. **Footer never extends** under or overlaps sidebar
4. **On mobile**, footer is hidden, not repositioned
5. **Margin-left** is inherited from main-wrapper (matches sidebar width)

```
CORRECT STRUCTURE:
┌─────────┬──────────────────────────────┐
│ SIDEBAR │  ┌────────────────────────┐  │
│         │  │ HEADER                 │  │
│         │  ├────────────────────────┤  │
│         │  │ CONTENT                │  │
│         │  │                        │  │
│         │  ├────────────────────────┤  │
│         │  │ FOOTER ← Inside wrapper│  │
│         │  └────────────────────────┘  │
└─────────┴──────────────────────────────┘

INCORRECT STRUCTURE (Current Issue):
┌─────────┬──────────────────────────────┐
│ SIDEBAR │  ┌────────────────────────┐  │
│         │  │ CONTENT                │  │
│         │  │                        │  │
│    ▲    │  └────────────────────────┘  │
│    │    ├──────────────────────────────┤
│    │    │ FOOTER ← Extends under sidebar
│    └────┼──────────────────────────────┤
          │ This causes overlap!         │
└─────────┴──────────────────────────────┘
```

---

## 6. Main Content Area

### 6.1 Content Padding

| Viewport | Horizontal Padding | Vertical Padding |
|----------|-------------------|------------------|
| Mobile | 16px (1rem) | 16px (1rem) |
| Tablet | 24px (1.5rem) | 24px (1.5rem) |
| Desktop | 32px (2rem) | 32px (2rem) |

### 6.2 Content Max Width

```css
.content-container {
  width: 100%;
  max-width: 1400px; /* Prevent ultra-wide content */
  margin: 0 auto;
}
```

### 6.3 Scroll Behavior

- Main content area is the only scrollable region
- Header remains sticky at top
- Sidebar is fixed (does not scroll with content)
- Footer scrolls with content (at bottom of scroll area)

---

## 7. Admin vs User Layout

### 7.1 Layout Differences

| Aspect | User Dashboard | Admin Dashboard |
|--------|----------------|-----------------|
| Sidebar nav items | 7 items | 7 + 3 admin items |
| Header badge | Subscription status | Admin role |
| Footer | Standard | + Admin tools link |
| Available routes | `/dashboard/*` | `/dashboard/*` + `/admin/*` |

### 7.2 Route Structure

```
USER ROUTES:
/dashboard          → Analytics overview
/trades             → Trade list
/trades/new         → New trade
/trades/[id]/edit   → Edit trade
/analytics          → Detailed analytics
/accounts           → Account management
/strategies         → Strategy management
/import             → Data import
/settings           → User settings

ADMIN ROUTES (additional):
/admin              → Admin dashboard
/admin/users        → User management
/admin/metrics      → Platform metrics
/admin/billing      → Billing management
/admin/sample-data  → Sample data management
/admin/audit-log    → Audit log viewer
```

### 7.3 Shared Layout Component

Both admin and user dashboards share the same layout shell:
- Same sidebar component (with conditional admin section)
- Same header component (with role-aware badge)
- Same footer component
- Only navigation items and accessible routes differ

---

## 8. Z-Index Strategy

### 8.1 Z-Index Scale

```css
:root {
  /* Background layers */
  --z-background: 0;
  --z-content: 10;
  --z-footer: 20;

  /* Fixed elements */
  --z-header: 30;
  --z-sidebar-overlay: 40;
  --z-sidebar: 50;

  /* Overlays and modals */
  --z-dropdown: 100;
  --z-modal-backdrop: 200;
  --z-modal: 210;
  --z-toast: 300;
  --z-tooltip: 400;
}
```

### 8.2 Stacking Context

```
┌─────────────────────────────────────────────────────────────────┐
│ z-400  TOOLTIP           (Highest - always on top)              │
├─────────────────────────────────────────────────────────────────┤
│ z-300  TOAST             (Notifications)                        │
├─────────────────────────────────────────────────────────────────┤
│ z-210  MODAL             (Dialog content)                       │
├─────────────────────────────────────────────────────────────────┤
│ z-200  MODAL BACKDROP    (Dark overlay)                         │
├─────────────────────────────────────────────────────────────────┤
│ z-100  DROPDOWN          (Menus, selects)                       │
├─────────────────────────────────────────────────────────────────┤
│ z-50   SIDEBAR           (Navigation)                           │
├─────────────────────────────────────────────────────────────────┤
│ z-40   SIDEBAR OVERLAY   (Mobile backdrop)                      │
├─────────────────────────────────────────────────────────────────┤
│ z-30   HEADER            (Sticky header)                        │
├─────────────────────────────────────────────────────────────────┤
│ z-20   FOOTER            (Page footer)                          │
├─────────────────────────────────────────────────────────────────┤
│ z-10   CONTENT           (Main page content)                    │
├─────────────────────────────────────────────────────────────────┤
│ z-0    BACKGROUND        (Base layer)                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Implementation Guidelines

### 9.1 CSS Variables

```css
:root {
  /* Layout dimensions */
  --sidebar-width-expanded: 256px;
  --sidebar-width-collapsed: 72px;
  --sidebar-width-mobile: 280px;
  --header-height: 64px;
  --header-height-mobile: 56px;
  --footer-height: 64px;
  --footer-height-tablet: 48px;

  /* Content spacing */
  --content-padding: 2rem;
  --content-padding-tablet: 1.5rem;
  --content-padding-mobile: 1rem;
  --content-max-width: 1400px;

  /* Transitions */
  --transition-sidebar: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
}

@media (max-width: 1023px) {
  :root {
    --content-padding: var(--content-padding-tablet);
  }
}

@media (max-width: 767px) {
  :root {
    --content-padding: var(--content-padding-mobile);
    --header-height: var(--header-height-mobile);
  }
}
```

### 9.2 Component File Structure

```
src/
├── components/
│   └── layout/
│       ├── app-shell.tsx        # Root layout wrapper
│       ├── sidebar/
│       │   ├── sidebar.tsx      # Main sidebar component
│       │   ├── sidebar-nav.tsx  # Navigation items
│       │   ├── sidebar-header.tsx
│       │   ├── sidebar-footer.tsx
│       │   └── sidebar-context.tsx  # Sidebar state management
│       ├── header/
│       │   ├── header.tsx       # Main header component
│       │   ├── header-search.tsx
│       │   ├── header-user-menu.tsx
│       │   └── role-badge.tsx
│       └── footer/
│           └── footer.tsx       # Footer component
├── hooks/
│   ├── use-sidebar.ts           # Sidebar state hook
│   ├── use-media-query.ts       # Responsive breakpoint hook
│   └── use-permissions.ts       # RBAC hook
└── styles/
    └── layout.css               # Layout-specific styles
```

### 9.3 State Management

```typescript
// Sidebar state context
interface SidebarState {
  isOpen: boolean;           // Mobile: overlay open
  isCollapsed: boolean;      // Desktop: collapsed to icons
  isMobile: boolean;         // Current viewport is mobile
  isTablet: boolean;         // Current viewport is tablet
  toggle: () => void;        // Toggle open/collapsed
  open: () => void;          // Open sidebar (mobile)
  close: () => void;         // Close sidebar (mobile)
  setCollapsed: (v: boolean) => void;
}

// Persist desktop collapsed preference
localStorage.setItem('sidebar-collapsed', 'true');
```

### 9.4 Responsive Hooks

```typescript
// useMediaQuery hook for breakpoint detection
function useMediaQuery(query: string): boolean;

// useBreakpoint hook for named breakpoints
function useBreakpoint(): {
  isMobile: boolean;   // < 768px
  isTablet: boolean;   // 768px - 1023px
  isDesktop: boolean;  // >= 1024px
};
```

### 9.5 Accessibility Requirements

1. **Sidebar**
   - `aria-expanded` on toggle button
   - `aria-hidden` when sidebar is closed on mobile
   - Focus trap when sidebar overlay is open
   - Escape key closes mobile sidebar

2. **Header**
   - Skip link to main content
   - Proper heading hierarchy
   - Dropdown menus with `aria-haspopup`

3. **Footer**
   - Navigation landmark (`<footer role="contentinfo">`)
   - Links have descriptive text

### 9.6 Performance Considerations

1. **Layout shifts**: Use CSS `contain` for sidebar/header
2. **Transitions**: Use `transform` instead of `width` for sidebar animation
3. **Event listeners**: Debounce resize handlers
4. **Render optimization**: Memoize layout components

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | January 2026 | System | Initial specification |
