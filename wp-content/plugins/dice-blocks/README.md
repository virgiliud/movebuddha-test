# Dice Blocks Plugin

This plugin is built with `@wordpress/scripts` via `create-block` and contains plain block markup with no standalone frontend CSS. The Dice Main theme compiles Tailwind styles for the entire monorepo, scanning the plugin codebase as well. You can still add editor-only or custom frontend styles here when needed, but Tailwind utility classes should be handled by the parent theme build.

## Quick Start
1. Run `npm install` to pull dependencies.
2. Use `npm run start` for a watched development build of the blocks.
3. Run `npm run build` to produce the production bundle in `build/`.
4. Optional: `npm run plugin-zip` creates a distributable zip if needed.

Activate the plugin in WordPress after building to load the custom blocks.
