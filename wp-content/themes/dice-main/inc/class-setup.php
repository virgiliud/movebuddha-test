<?php
/**
 * Theme setup configuration.
 *
 * @package Dice
 */

declare(strict_types=1);

namespace Dice;

use function __;
use function add_action;
use function add_theme_support;
use function register_nav_menus;
use function remove_post_type_support;

/**
 * Configure core theme features, hooks, and editor integrations.
 */
final class Setup {
	/**
	 * Attach WordPress hooks.
	 */
	public function register(): void {
		add_action( 'after_setup_theme', array( $this, 'register_theme_supports' ) );
		add_action( 'init', array( $this, 'register_menus' ) );
		add_action( 'init', array( $this, 'disable_post_comments' ), 100 );
	}

	/**
	 * Configure theme supports.
	 *
	 * Note: Disabling Typography/Border controls happens in theme.json, not here.
	 */
	public function register_theme_supports(): void {
		// Core basics.
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );

		// Modern markup.
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
		add_theme_support( 'responsive-embeds' );
	}

	/**
	 * Register global navigation menus.
	 */
	public function register_menus(): void {
		register_nav_menus(
			array(
				'primary' => __( 'Primary Menu', 'dice' ),
				'footer'  => __( 'Footer Menu', 'dice' ),
			)
		);
	}

	/**
	 * Disable comments for standard posts.
	 */
	public function disable_post_comments(): void {
		remove_post_type_support( 'post', 'comments' );
		remove_post_type_support( 'post', 'trackbacks' );
	}
}
