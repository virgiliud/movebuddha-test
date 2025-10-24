# moveBuddha Dice Demo Monorepo

This repository is a WordPress monorepo that contains the Dice parent theme, its child themes, and the Dice Blocks plugin. The project follows a hybrid theme architecture, where both classic PHP templates and modern block-based elements exist. It uses theme.json for global styles for consistent design control across the sites.

## Intended Use
This is a test/demo project intended for demonstration purposes only. It uses static and example-based content (e.g. placeholder blocks, sample SEO schema, mock data, etc).

## Architecture
- **Dice Main Theme** – provides the global Tailwind/PostCSS build pipeline and compiles utilities for the entire repo (themes and plugin).
- **Child Themes** – inherit the parent CSS and supply brand-specific styles.
- **Dice Blocks Plugin** – custom blocks generated with `create-block`, relying on the main theme build for Tailwind styling.

