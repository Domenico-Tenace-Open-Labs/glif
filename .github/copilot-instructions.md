# Glif - Copilot Instructions

Glif is a modern, progressive web application (PWA) for creating, customizing, and downloading QR codes with an intuitive user interface. This document provides comprehensive information about the project's architecture, technologies, patterns, and structure.

---

## Project Overview

**Glif** is a full-featured QR code generator and downloader application built with modern web technologies. It allows users to:
- Generate QR codes from text, URLs, or any data
- Customize QR code appearance (size, colors, error correction level)
- Render as canvas or image
- Include embedded images in QR codes
- Download generated QR codes as PNG files
- Work offline as a Progressive Web App (PWA)

**Project Information:**
- **Name:** Glif
- **Description:** Application that allows you to create and download customizable QR codes
- **Version:** 0.2.1
- **License:** MIT
- **Author:** Domenico Tenace
- **Repository:** https://github.com/Domenico-Tenace-Open-Labs/glif

---

## Technology Stack

### Core Framework & UI
- **Nuxt 4** (^4.1.3) - Full-stack Vue framework for production
- **Vue 3** (^3.5.22) - Progressive JavaScript framework for building user interfaces
- **Vue Router 4** (^4.6.3) - Official router for Vue 3
- **TypeScript** - Strongly typed programming language that builds on JavaScript

### Styling & Design
- **Tailwind CSS 4** (^4.1.15) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.15) - Vite integration for Tailwind CSS
- **Inter Font** - Modern, open-source sans-serif font via Google Fonts

### Libraries & Utilities
- **qrcode.vue** (^3.6.0) - Vue component wrapper for QR code generation with extensive customization options
- **@vite-pwa/nuxt** (^1.0.7) - PWA module for Nuxt with offline support and service worker management
- **@nuxt/fonts** (^0.11.4) - Font optimization and Google Fonts integration

### Development Tools
- **Vite** - Lightning-fast frontend build tool (integrated with Nuxt)
- **Node.js** - JavaScript runtime environment

---

## Project Structure

### Root Level Files
```
glif/
├── nuxt.config.ts          # Main Nuxt configuration file
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies and scripts
├── README.md               # Project documentation
├── CONTRIBUTING.md         # Contribution guidelines
├── LICENSE                 # MIT License file
└── .github/
    └── copilot-instructions.md  # This file
```

### Application Directory (`app/`)
The `app/` directory contains all application source code.

#### `app/app.vue`
The root component that wraps the entire application. It serves as the entry point for the Vue application and contains the `<NuxtLayout>` and `<NuxtPage>` components for layout and page rendering.

#### `app/pages/`
Contains page components that map to routes. Each `.vue` file in this directory automatically creates a route.

- **`pages/index.vue`** - Home page
  - Hero section with application title and description
  - Call-to-action button linking to the QR code creation page
  - Animated background with gradient pattern
  - Uses `Navbar` and `Footer` components via layout

- **`pages/create/index.vue`** - QR Code creation page
  - Main application page with two-column layout (form and preview)
  - Left column: `FormCreateQRCode` component for input controls
  - Right column: QR code preview using `qrcode.vue` component
  - Responsive design (stacks on mobile)
  - Uses `useQRCode()` composable for state management

#### `app/components/`
Reusable Vue components organized by category.

##### Common Components (`components/common/`)
- **`Navbar.vue`** - Navigation bar component
  - Logo and brand name
  - Navigation links (Home, Create)
  - Sticky header with primary theme color
  - Responsive design (hidden on mobile)

- **`Footer.vue`** - Footer component
  - Attribution to author
  - Link to GitHub repository
  - Consistent styling with navbar

##### Form Components (`components/form/`)
- **`CreateQRCode.vue`** - QR code form component
  - Text input area for QR code value (URL, text, etc.)
  - Background color picker
  - Foreground color picker
  - Image size slider (range: 50-270)
  - Reset button to clear all values
  - Download button to save QR code as PNG
  - Form validation (checks for empty value)

##### Generic Components (`components/generic/`)
- **`Button.vue`** - Reusable button component
  - Props: `disabled` (boolean), `bgColor` (optional color scheme)
  - Supports primary and secondary color variants
  - Styling for hover, focus, and disabled states
  - Flexible styling with computed properties

##### Icon Components (`components/icon/`)
- **`Logo.vue`** - Brand logo component
- **`Navbar.vue`** - Icon for navigation (if applicable)
- **`Create.vue`** - Create icon
- **`Home.vue`** - Home icon
- **`Download.vue`** - Download icon
- **`Reset.vue`** - Reset/refresh icon

#### `app/composables/`
Composable functions for Vue 3 composition API - encapsulating reactive state and logic.

- **`qrCode.ts`** - Main QR code composable
  - **Exported Function:** `useQRCode()`
  - **Reactive State (QRCodeData interface):**
    - `value: string` - The data to encode in the QR code
    - `size: number` - QR code size in pixels (default: 150)
    - `level: Level` - Error correction level (L, M, Q, H)
    - `renderAs: RenderAs` - Render format (canvas or image)
    - `background: string` - Background color in hex format (default: white)
    - `foreground: string` - Foreground color in hex format (default: black)
    - `imageSettings: ImageSettings` - Embedded image configuration
      - `src: string` - Image URL
      - `height: number` - Image height in pixels (default: 80)
      - `width: number` - Image width in pixels (default: 80)
      - `excavate: boolean` - Remove QR code area where image is placed (default: true)
  - **Methods:**
    - `resetData()` - Reset all QR code settings to defaults
    - `downloadQRCode()` - Download QR code as PNG file with timestamp
  - **Returns:** `{ data, resetData, downloadQRCode }`

#### `app/layouts/`
Layout components that wrap page content with common UI elements.

- **`default.vue`** - Default application layout
  - Includes PWA manifest
  - Wraps pages with `CommonNavbar` and `CommonFooter`
  - Provides consistent structure across all pages

#### `app/assets/`
Static assets including stylesheets.

##### CSS (`assets/css/`)
- **`main.css`** - Global application styles
  - CSS variables for theming
  - Global base styles
  - Tailwind CSS directives

### Public Directory (`public/`)
Static files served as-is and not processed by the build system.

- **`favicon.ico`** - Browser tab favicon
- **`browserconfig.xml`** - Windows tile configuration
- **`manifest.json`** - Web app manifest for PWA
- **`robots.txt`** - Search engine crawler instructions
- **`pwa-192x192.png`** - PWA icon (192x192 pixels)

---

## Architecture & Design Patterns

### Component-Based Architecture
The project follows a **component-based architecture** where:
- Each UI element is encapsulated as a reusable component
- Components are organized by functionality and purpose
- Components follow single responsibility principle
- Clear separation of concerns between presentation and logic

### State Management Pattern
The application uses **Nuxt composables** for state management (Vue 3 Composition API):
- **Centralized state:** QR code data is managed in the `useQRCode()` composable
- **Reactive updates:** Vue's reactivity system automatically updates the UI when state changes
- **Simple and lightweight:** No need for complex state management libraries for this application size
- **Direct component integration:** Pages and components directly use the composable

### Page Structure
Each page follows a consistent pattern:
1. Import necessary composables or data
2. Define template structure
3. Bind reactive data to form inputs and displays
4. Implement user interaction handlers

### Responsive Design Pattern
- **Mobile-first approach:** Base styles are mobile-friendly, enhanced with responsive utilities
- **Tailwind responsive prefixes:** `md:` prefix for medium screens and above
- **Flexible layouts:** CSS Grid and Flexbox for responsive positioning
- **Viewport configuration:** Set in `nuxt.config.ts` for proper mobile rendering

### Composition API Pattern
Components use Vue 3's Composition API with `<script setup>` syntax:
- More concise and readable code
- Better TypeScript support
- Improved code organization
- Easier component composition and reuse

---

## Configuration Details

### Nuxt Configuration (`nuxt.config.ts`)

#### App Configuration
- **Compatibility Date:** 2025-07-15 (for Nuxt version compatibility)
- **Dev Tools:** Disabled for production builds
- **Page Transitions:** Out-in transition mode for smooth page changes
- **Title:** "Glif | Create and download customizable QR codes"
- **Viewport:** Responsive viewport settings for mobile devices
- **Favicon:** Sourced from `/favicon.ico`

#### Modules
- **@vite-pwa/nuxt** - PWA capabilities (offline support, service worker)
- **@nuxt/fonts** - Font loading and optimization

#### CSS & Styling
- **Global Stylesheet:** `~/assets/css/main.css`
- **Tailwind CSS:** Configured via Vite plugin

#### Fonts
- **Provider:** Google Fonts
- **Font Family:** Inter (modern, open-source sans-serif)
- **Weights:** 300, 400, 500, 600, 700
- **Styles:** Normal

#### PWA Configuration
- **Strategy:** Generate Service Worker
- **Register Type:** Auto Update (automatically update in background)
- **App Name:** Glif
- **Theme Color:** Primary green (HEX: 4caf50)
- **Icons:** PWA icons (120x120, 144x144 pixels)

### TypeScript Configuration (`tsconfig.json`)
- Nuxt automatically generates proper TypeScript configuration
- Supports all modern TypeScript features
- Type checking for Vue components

---

## Development Workflow

### Available Scripts (`package.json`)

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build project for production
npm run generate     # Pre-render static site
npm run preview      # Preview production build locally
npm run postinstall  # Nuxt prepare (runs automatically after npm install)
npm run preview-test # Build and preview in one command
```

### Development Workflow
1. **Local Development:** Use `npm run dev` for development with hot module replacement (HMR)
2. **Testing:** Test QR code generation and customization features
3. **Build & Deploy:** Run `npm run build` to create optimized production bundle
4. **Static Generation:** Use `npm run generate` for static site generation if needed

---

## Styling & Theme System

### Tailwind CSS Configuration
- **Framework:** Tailwind CSS v4 with Vite integration
- **Approach:** Utility-first CSS framework
- **Colors:** Custom color palette defined in global CSS
- **Responsive Design:** Mobile-first with `md:` breakpoints

### Color Variables
The application uses CSS custom properties for theming:
- **Primary Color:** `var(--color-primary)` - Used for main buttons and navigation (green, HEX: 4caf50)
- **Neutral Colors:** `var(--color-neutral-*)` - Gray scale colors (800, 500, etc.)
- **Background Colors:** `var(--color-background-*)` - Background variants
- **Foreground/Surface:** `var(--color-surface)` - Text and foreground elements

### Typography
- **Font Family:** Inter (modern, open-source sans-serif)
- **Font Classes:** Standard Tailwind font utilities (text-sm, text-lg, text-xl, etc.)
- **Font Weights:** 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

---

## Key Features Implementation

### QR Code Generation
- Uses **qrcode.vue** library wrapping `qrcode.js`
- Supports multiple render types: canvas and image
- Customizable error correction levels (L, M, Q, H)
- Color customization for both foreground and background

### Download Functionality
- Converts canvas to PNG data URL
- Creates temporary download link
- Filename uses timestamp for uniqueness
- Validates that QR code value is not empty

### Form Validation
- Client-side validation in `downloadQRCode()` method
- Alert if user tries to download empty QR code
- Real-time preview updates as user modifies settings

### PWA Features
- Service worker for offline capability
- Auto-updates in background
- Installable on home screen
- Works offline with previously cached data

---

## Code Style & Best Practices

### Vue Component Patterns
- **Single File Components (SFC):** All components use `.vue` file format
- **Script Setup:** Modern, concise syntax with `<script setup>`
- **Template Organization:** Clear hierarchy and semantic HTML
- **Scoped Styles:** Not used (Tailwind utilities instead)

### TypeScript Usage
- **Type Safety:** Interfaces and types for QR code data
- **Prop Types:** Components define prop types with TypeScript
- **Composable Typing:** Full type support in composables

### Naming Conventions
- **Components:** PascalCase (e.g., `CreateQRCode.vue`, `Button.vue`)
- **Composables:** Prefix with `use` (e.g., `useQRCode`)
- **Files:** PascalCase for components, lowercase for other files
- **Variables:** camelCase for local variables

### Component Organization
- Group components by feature/purpose (common, form, generic, icon)
- Keep components small and focused
- One main component per file
- Reuse generic components (Button) across pages

---

## Routing

The application uses **Nuxt's file-based routing**:
- `pages/index.vue` → `/` (home page)
- `pages/create/index.vue` → `/create` (QR code creation page)
- Automatic route generation based on file structure
- No manual route configuration needed

---

## Performance Optimizations

### Build Optimization
- **Nuxt Build:** Automatic code splitting and optimization
- **Vite:** Lightning-fast development and production builds
- **Tailwind CSS:** Only includes used styles in production

### PWA Performance
- **Service Worker:** Caches resources for offline access
- **Auto-update:** Background updates without disrupting user experience
- **Prerendering:** Static site generation for improved first load

### Responsive Images
- Background gradients and patterns as CSS (no image files)
- Minimal image usage for better performance
- SVG icons via Vue components

---

## Browser Support

- Modern browsers with ES2020+ support
- Progressive enhancement for older browsers
- Mobile-first responsive design
- Works on desktop, tablet, and mobile devices
- Installable as PWA on supporting browsers

---

## Development Guidelines

### Adding New Features
1. **Create components** in appropriate `components/` subdirectory
2. **Use TypeScript** for type safety
3. **Follow naming conventions** (PascalCase for components)
4. **Add to composables** if state management needed
5. **Use Tailwind CSS** for styling
6. **Test responsiveness** across devices

### Modifying QR Code Options
- Update `QRCodeData` interface in `qrCode.ts`
- Add form inputs in `CreateQRCode.vue`
- Bind inputs to reactive data properties
- Add validation if needed in `downloadQRCode()` method

### Adding New Pages
1. Create `.vue` file in `pages/` directory
2. Use layout system with `NuxtLayout`
3. Import and use composables as needed
4. Components automatically receive routes

---

## Dependencies Management

### Direct Dependencies
- `nuxt` - Core framework
- `vue` - UI framework
- `vue-router` - Routing
- `qrcode.vue` - QR code generation
- `tailwindcss` - Styling
- `@nuxt/fonts` - Font optimization
- `@vite-pwa/nuxt` - PWA functionality

### Development Setup
- Install dependencies: `npm install`
- Nuxt prepare runs automatically post-install
- No external build tools needed beyond Nuxt

---

## Additional Notes

- The project maintains a clean, minimal structure focused on QR code functionality
- All dependencies are well-maintained and actively supported
- TypeScript provides type safety throughout the codebase
- Tailwind CSS provides consistent, utility-driven styling
- Nuxt abstracts away complex webpack/build configuration
- PWA capabilities allow offline usage
- Font optimization improves initial load time