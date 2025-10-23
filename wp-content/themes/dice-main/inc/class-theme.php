<?php
/**
 * Theme orchestrator.
 *
 * @package Dice
 */

declare(strict_types=1);

namespace Dice;

/**
 * Bootstrap the theme by wiring setup and asset managers.
 */
final class Theme {
	/**
	 * Theme setup handler.
	 *
	 * @var Setup
	 */
	private Setup $setup;

	/**
	 * Theme assets handler.
	 *
	 * @var Assets
	 */
	private Assets $assets;

	/**
	 * Inject dependencies.
	 *
	 * @param Setup  $setup  Theme setup manager.
	 * @param Assets $assets Assets loader.
	 */
	public function __construct( Setup $setup, Assets $assets ) {
		$this->setup  = $setup;
		$this->assets = $assets;
	}

	/**
	 * Register theme hooks.
	 */
	public function register(): void {
		$this->setup->register();
		$this->assets->register();
	}
}
