<?php
/**
 * Plugin Name:       Dice Blocks
 * Description:       Collection of blocks for the Dice theme.
 * Requires at least: 6.5
 * Requires PHP:      8.0
 * Version:           0.1.0
 * Author:            moveBuddha
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dice-blocks
 */

if (! defined('ABSPATH')) {
    exit;
}

/**
 * Register all built block types.
 *
 * Uses the compiled block metadata so asset references like
 * file:./index.js and file:./style-index.css resolve correctly.
 *
 * @since 0.1.0
 * @return void
 */
function dice_blocks_register_built_blocks() {
    $blockMetadataFiles = glob(__DIR__ . '/build/*/block.json');

    if ($blockMetadataFiles === false) {
        return;
    }

    foreach ($blockMetadataFiles as $metadata) {
        register_block_type(dirname($metadata));
    }
}
add_action( 'init', 'dice_blocks_register_built_blocks', 10 );

/**
 * Register the custom Dice block category.
 *
 * @since 0.1.0
 * @param array $categories Existing block categories.
 * @param WP_Block_Editor_Context $context Block editor context.
 * @return array
 */
function dice_blocks_register_category( $categories, $context ) {
    // Prevent duplicates
    foreach ( $categories as $category ) {
        if ( isset( $category['slug'] ) && 'dice' === $category['slug'] ) {
            return $categories;
        }
    }

    $dice_category = array(
        'slug'  => 'dice',
        'title' => __( 'Dice', 'dice-blocks' ),
    );

    $new_categories = array();
    $inserted = false;

    foreach ( $categories as $category ) {
        $new_categories[] = $category;

        // Insert Dice after the "text" category
        if ( isset( $category['slug'] ) && 'text' === $category['slug'] ) {
            $new_categories[] = $dice_category;
            $inserted = true;
        }
    }

    // If "text" was not found append Dice to the end
    if ( ! $inserted ) {
        $new_categories[] = $dice_category;
    }

    return $new_categories;
}
add_filter( 'block_categories_all', 'dice_blocks_register_category', 10, 2 );