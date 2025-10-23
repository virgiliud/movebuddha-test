# Dice Main Theme

Basic steps for local development:

1. Run `npm install` to install PostCSS/Tailwind dependencies.
2. Use `npm run build` to compile production CSS into `assets/build/`.
3. During active development run `npm run dev:app` and `npm run dev:editor` in separate terminals (or sequentially) to watch the app and editor styles.
4. The theme uses WordPress Coding Standards (WPCS), for compliant PHP code style. Run `composer install` to set up PHP dependencies, including linters and tools.
5. Use `composer lint` to check code quality against WordPress Coding Standards (WPCS).
6. Use `composer lint:fix` to automatically fix coding standard violations where possible.

Activate the theme in WordPress after building to see the compiled styles.
