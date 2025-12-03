# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Shopify theme called "Split" (version 4.3.3) for the Fiumara Culinary brand. It's a custom Liquid-based e-commerce theme with extensive JavaScript components and modular section architecture.

## Development Commands

### Core Shopify CLI Commands
- `npm run dev` - Start local development server connected to fiumara-apparel.myshopify.com store (theme ID: 136398012479)
- `npm run push` - Push local theme changes to the Shopify store
- `npm run pull` - Pull theme changes from the Shopify store to local

### MCP Server Integration
The project supports Shopify Dev MCP server integration. To add globally:
```bash
claude mcp add shopify-dev -- npx -y @shopify/dev-mcp@latest
```

## Architecture

### Directory Structure
- `layout/` - Theme layouts (theme.liquid, gift-card.liquid, password.liquid, popup.liquid)
- `sections/` - Modular theme sections (50+ sections including header, footer, product, collection, etc.)
- `snippets/` - Reusable Liquid partials (product badges, forms, SEO, localization, etc.)
- `templates/` - Page templates in JSON format (product, collection, page variants, etc.)
- `assets/` - JavaScript components, CSS files, and vendor libraries
- `config/` - Theme settings (settings_schema.json, settings_data.json)
- `locales/` - Translation files for internationalization (multiple languages supported with schema files)
- `.shopify/` - Shopify CLI configuration and metafields

### Component Architecture

**JavaScript Components:**
- Component-based architecture with custom elements pattern
- Main entry: `assets/theme.js` (initializes KROWN theme namespace)
- Component files follow naming: `component-*.js` (e.g., component-cart.js, component-product-form.js)
- Section-specific JS: `section-*.js` (e.g., section-header.js, section-main-product.js)

**Liquid Sections:**
- Sections are the primary building blocks for page composition
- Main templates: `main-*.liquid` (product, collection, cart, etc.)
- Helper sections: `helper-*.liquid` (cart, localization, predictive search, pickup availability)
- Sections include schema definitions for Shopify theme editor customization

**CSS Organization:**
- Main stylesheet: `theme.css`
- Custom overrides: `custom.css`
- Component-specific styles: `component-*.css`
- Section-specific styles: Auto-loaded via liquid `{{ 'section-name.css' | asset_url | stylesheet_tag }}`

### Key Technical Patterns

**Image Handling:**
- Use `image_url` filter (NOT deprecated `img_url`)
- Responsive images with srcset patterns
- Lazy loading implemented via `loading="lazy"`
- Custom lazy-image snippets available

**Custom Colors:**
- Sections support custom background/text colors via `custom-colors` snippet
- Pattern: `{%- render 'custom-colors', id: section.id, background: section.settings.custom_background, text: section.settings.custom_text -%}`

**RTL Support:**
- Direction detection based on locale ISO codes (ar, he, ur, fa, pa, sd, ku)
- HTML dir attribute dynamically set in theme.liquid

**SEO:**
- Powered by Plug in SEO Plus
- Extensive SEO snippets: pluginseo-*.liquid
- Microdata schema and Open Graph support
- Custom metafields for noindex control

**Localization:**
- Multi-language support with extensive locale files
- Localization forms for currency/language switching
- Langify plugin integration for language variants

## Development Guidelines

### CSS Best Practices
- Prefer mobile-first approach in CSS
- Check responsive behavior across breakpoints

### Liquid Templating
- Always escape user-generated content with `| escape` filter
- Use liquid comments: `{% comment %} ... {% endcomment %}`
- Conditional rendering: `{%- liquid ... -%}` for cleaner markup

### JavaScript Development
- Use console logs for debugging (not logger)
- Theme namespace: `KROWN.themeName`, `KROWN.themeVersion`
- Global keycodes available: `window.KEYCODES` (TAB: 9, ESC: 27, etc.)
- Custom elements pattern for components

### Testing & Validation
- After making changes to TypeScript files, always check for TypeScript errors
- Test theme changes in Shopify theme editor
- Verify cart functionality with `cart-form` custom events

## Store Configuration

**Shopify Store:** fiumara-apparel.myshopify.com
**Theme ID:** 136398012479

## Important Notes

- The theme includes extensive plugin integrations (SEO, langify, etc.)
- Cart functionality uses custom web components with event-driven updates
- Modal/popup system uses custom `modal-box` elements
- Newsletter popup uses localStorage for display tracking
- Instant page loading via instantpage.js vendor library
