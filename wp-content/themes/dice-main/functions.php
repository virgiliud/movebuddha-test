<?php
/**
 * Theme bootstrap file.
 *
 * @package Dice
 */

declare(strict_types=1);

use Dice\Assets;
use Dice\Setup;
use Dice\Theme;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$autoload = __DIR__ . '/vendor/autoload.php';

if ( is_readable( $autoload ) ) {
	require_once $autoload;
}

spl_autoload_register(
	static function ( string $class_name ): void {
		$prefix = 'Dice\\';

		if ( 0 !== strpos( $class_name, $prefix ) ) {
			return;
		}

		// Note: WordPress style autoloader uses "class-" prefix and hyphens (not PSR-4 paths).
		$relative_class = substr( $class_name, strlen( $prefix ) );
		$filename       = 'class-' . strtolower( str_replace( '\\', '-', $relative_class ) ) . '.php';
		$file           = __DIR__ . '/inc/' . $filename;

		if ( is_readable( $file ) ) {
			require_once $file;
		}
	}
);

( new Theme( new Setup(), new Assets() ) )->register();
