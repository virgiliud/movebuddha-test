<?php
/**
 * Dice NerdWallet child theme setup and overrides.
 *
 * Handles stylesheet loading and brand-specific adjustments for the Dice NerdWallet child theme.
 *
 * @package Dice_NerdWallet
 */

declare(strict_types=1);

/**
 * Enqueue parent and child theme styles.
 *
 * Ensures the parent theme's stylesheet is loaded first followed by the compiled child theme CSS bundle.
 *
 * @since 0.1.0
 *
 * @return void
 */
add_action('wp_enqueue_scripts', static function (): void {
    $parent_version = wp_get_theme('dice-main')->get('Version') ?: '0.1.0';

    // Load parent theme stylesheet.
    wp_enqueue_style(
        'dice-parent-style',
        get_template_directory_uri() . '/style.css',
        [],
        $parent_version
    );

    // Build path and URI to the compiled child stylesheet.
    $child_asset_path = get_stylesheet_directory() . '/assets/build/style.css';
    $child_asset_uri  = get_stylesheet_directory_uri() . '/assets/build/style.css';

    // Only enqueue the child stylesheet if it exists.
    if (file_exists($child_asset_path)) {
        wp_enqueue_style(
            'dice-nerdwallet-style',
            $child_asset_uri,
            ['dice-parent-style'],
            (string) filemtime($child_asset_path) // Cache-bust with file modification time.
        );
    }
}, 20);

/**
 * Google Fonts families for the brand.
 *
 * This filter customizes the font stack used throughout the theme.
 *
 * @since 0.1.0
 *
 * @param array $families Existing Google Fonts family definitions.
 * @return array Modified array of font families for the brand.
 */
add_filter('dice/google_fonts_families', static function (array $families): array {
    return [
        'Poppins:wght@400;600;700',
        'Nunito Sans:wght@400;600;700',
    ];
});
