<?php
/**
 * Theme asset registration and helpers.
 *
 * @package Dice
 */

declare(strict_types=1);

namespace Dice;

/**
 * Handles the registration and loading of theme assets.
 */
final class Assets {
	private const GOOGLE_FONTS_HANDLE = 'dice-google-fonts';

	/**
	 * Register hooks used to enqueue theme assets.
	 */
	public function register(): void {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_frontend' ) );
		add_action( 'after_setup_theme', array( $this, 'register_editor_styles' ) );
		add_action( 'after_setup_theme', array( $this, 'register_editor_fonts' ) );
		add_filter( 'wp_resource_hints', array( $this, 'add_preconnect_hints' ), 10, 2 );
	}

	/**
	 * Enqueue frontend assets if they exist.
	 */
	public function enqueue_frontend(): void {

		$fonts_url = $this->google_fonts_url();
		if ( $fonts_url ) {
			wp_enqueue_style(
				self::GOOGLE_FONTS_HANDLE,
				$fonts_url,
				array(),
				wp_get_theme()->get( 'Version' )
			);
		}

		$app_style  = 'assets/build/app.css';
		$app_script = 'assets/build/app.js';

		if ( $this->asset_exists( $app_style ) ) {
			wp_enqueue_style(
				'dice/app',
				$this->asset_url( $app_style ),
				array(),
				$this->asset_version( $app_style )
			);
		}

		if ( $this->asset_exists( $app_script ) ) {
			wp_enqueue_script(
				'dice/app',
				$this->asset_url( $app_script ),
				array(),
				$this->asset_version( $app_script ),
				true
			);
		}
	}

	/**
	 * Register styles used in the block editor.
	 */
	public function register_editor_styles(): void {
		add_theme_support( 'editor-styles' );

		$editor_rel = 'assets/build/editor.css';
		if ( $this->asset_exists( $editor_rel ) ) {
			add_editor_style( $editor_rel );
		}
	}

	/**
	 * Register fonts used within the block editor.
	 */
	public function register_editor_fonts(): void {
		add_theme_support( 'editor-styles' );

		$fonts_url = $this->google_fonts_url();
		if ( $fonts_url ) {
			// Loads Google Fonts inside the block editor iframe.
			add_editor_style( $fonts_url );
		}
	}

	/**
	 * Retrieve the Google Font families that should be loaded.
	 *
	 * Child themes can filter this to change or clear the families.
	 * Returning an empty array disables Google Fonts entirely.
	 */
	private function google_fonts_families(): array {
		$families = array(
			'Inter:wght@400;600;700',
			'DM Sans:wght@400;600;700',
		);

		/**
		 * Filters the list of Google Font families the theme should load.
		 *
		 * @param string[] $families e.g. [ 'Open Sans:wght@400;600;700', 'Montserrat:wght@600;700' ].
		 */
		return (array) apply_filters( 'dice_google_fonts_families', $families );
	}

	/**
	 * Builds the Google Fonts stylesheet URL using the current families.
	 * Returns an empty string when no fonts should be loaded.
	 */
	private function google_fonts_url(): string {
		$families = array_values( array_filter( $this->google_fonts_families() ) );
		if ( empty( $families ) ) {
			/**
			 * Allows a child theme to completely short-circuit the URL generation.
			 * If you return a non-empty string here, it will be used verbatim.
			 */
			return (string) apply_filters( 'dice_google_fonts_url', '' );
		}

		// Build the query: family=Foo:wght@...&family=Bar:wght@...&display=swap.
		$family_query = implode(
			'&',
			array_map(
				static fn( $f ) => 'family=' . str_replace( ' ', '+', $f ),
				$families
			)
		);

		// Allow tweaking "display=swap" or adding text=... subsets, etc.
		$args = array(
			'display' => 'swap',
		);
		$args = (array) apply_filters( 'dice_google_fonts_query_args', $args );

		$url = 'https://fonts.googleapis.com/css2?' . $family_query . '&' . http_build_query( $args, '', '&', PHP_QUERY_RFC3986 );

		/**
		 * Final filter for complete control (e.g. serve from a proxy/CDN).
		 *
		 * @param string $url Fully-formed stylesheet URL.
		 */
		return (string) apply_filters( 'dice_google_fonts_url', $url );
	}

	/**
	 * Add preconnect hints for Google Fonts when needed.
	 *
	 * @param array  $urls          URLs to output for resource hints.
	 * @param string $relation_type The relation type being filtered.
	 */
	public function add_preconnect_hints( array $urls, string $relation_type ): array {
		if ( 'preconnect' === $relation_type ) {
			// Only add preconnect if we’re actually using Google Fonts.
			$using_google = (bool) apply_filters( 'dice_google_fonts_preconnect', ( $this->google_fonts_url() !== '' ) );
			if ( $using_google ) {
				$urls[] = 'https://fonts.googleapis.com';
				$urls[] = 'https://fonts.gstatic.com';
			}
		}
		return $urls;
	}

	/**
	 * Resolve a URL to an asset, preferring a child override if present,
	 * otherwise falling back to the parent's asset.
	 *
	 * @param string $relative Relative path to the asset.
	 */
	private function asset_url( string $relative ): string {
		$relative = ltrim( $relative, '/' );

		$child_path = trailingslashit( get_stylesheet_directory() ) . $relative;
		if ( file_exists( $child_path ) ) {
			return trailingslashit( get_stylesheet_directory_uri() ) . $relative;
		}

		// Fallback to parent.
		return trailingslashit( get_template_directory_uri() ) . $relative;
	}

	/**
	 * Resolve a filesystem path to an asset, preferring a child override if present,
	 * otherwise falling back to the parent's asset path.
	 *
	 * @param string $relative Relative path to the asset.
	 */
	private function asset_path( string $relative ): string {
		$relative   = ltrim( $relative, '/' );
		$child_path = trailingslashit( get_stylesheet_directory() ) . $relative;

		if ( file_exists( $child_path ) ) {
			return $child_path;
		}

		// Fallback to parent.
		return trailingslashit( get_template_directory() ) . $relative;
	}

	/**
	 * Check whether an asset exists.
	 *
	 * @param string $relative Relative path to the asset.
	 */
	private function asset_exists( string $relative ): bool {
		return file_exists( $this->asset_path( $relative ) );
	}

	/**
	 * Determine an asset version based on its modification time.
	 *
	 * @param string $relative Relative path to the asset.
	 */
	private function asset_version( string $relative ): string {
		$path = $this->asset_path( $relative );
		return file_exists( $path ) ? (string) filemtime( $path ) : '0.1.0';
	}
}
