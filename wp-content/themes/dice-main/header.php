<?php
/**
 * Header template.
 *
 * @package Dice
 */

declare(strict_types=1);
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
	<div class="site-header__inner">
	<div class="site-header__layout">

		<!-- Brand -->
		<div class="site-header__brand">
		<?php if ( has_custom_logo() ) : ?>
			<div class="site-header__logo">
			<?php the_custom_logo(); ?>
			</div>
		<?php else : ?>
			<div class="site-header__logo-placeholder">
			<span><?php echo esc_html( strtoupper( mb_substr( get_bloginfo( 'name' ), 0, 1 ) ) ); ?></span>
			</div>
		<?php endif; ?>

		<?php if ( is_front_page() && is_home() ) : ?>
			<h1 class="site-header__title">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
				<?php bloginfo( 'name' ); ?>
			</a>
			</h1>
		<?php else : ?>
			<p class="site-header__title">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
				<?php bloginfo( 'name' ); ?>
			</a>
			</p>
		<?php endif; ?>

		<?php
		$description = get_bloginfo( 'description', 'display' );
		if ( $description || is_customize_preview() ) :
			?>
			<span class="site-header__tagline"><?php echo esc_html( $description ); ?></span>
		<?php endif; ?>
		</div>

		<?php $has_primary_menu = has_nav_menu( 'primary' ); ?>

		<?php if ( $has_primary_menu ) : ?>

		<!-- Desktop nav (md+) -->
		<nav class="site-header__nav-desktop" aria-label="<?php esc_attr_e( 'Primary Menu', 'dice' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'menu site-header__list-desktop',
					'fallback_cb'    => false,
					'depth'          => 2,
				)
			);
			?>
		</nav>

		<!-- Mobile controls (pure CSS) -->
		<input type="checkbox" id="mobile-menu-toggle" class="site-header__checkbox" />
		<label for="mobile-menu-toggle" class="site-header__toggle" aria-label="<?php esc_attr_e( 'Toggle menu', 'dice' ); ?>">
			<span></span><span></span><span></span>
			<span class="sr-only"><?php esc_html_e( 'Toggle menu', 'dice' ); ?></span>
		</label>

		<div class="site-header__mobile" aria-hidden="true">
			<div class="site-header__mobile-panel">
			<div class="site-header__mobile-inner">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'menu site-header__list-mobile',
						'fallback_cb'    => false,
						'depth'          => 2,
					)
				);
				?>
			</div>
			</div>
		</div>

		<?php endif; ?>

	</div>
	</div>
</header>

<main id="primary" class="site-main">
