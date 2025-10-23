<?php
/**
 * Template for displaying 404 pages.
 *
 * @package Dice
 */

declare(strict_types=1);

get_header();
?>
<div class="wrapper">
<section class="error-404 not-found space-y-6" aria-labelledby="page-title">
		<header class="page-header">
				<h1 id="page-title" class="page-title text-3xl font-semibold"><?php esc_html_e( 'Page not found', 'dice' ); ?></h1>
		</header>

		<div class="page-content space-y-4">
				<p><?php esc_html_e( 'It looks like nothing was found at this location. Try one of the links below or a search?', 'dice' ); ?></p>

				<?php get_search_form(); ?>

				<nav class="error-navigation" aria-label="<?php esc_attr_e( 'Popular content', 'dice' ); ?>">
						<h2 class="text-xl font-semibold"><?php esc_html_e( 'Browse our latest posts', 'dice' ); ?></h2>
						<?php
						the_widget(
							'WP_Widget_Recent_Posts',
							array(
								'number' => 5,
							)
						);
						?>
				</nav>
		</div>
</section>
</div>
<?php
get_footer();
