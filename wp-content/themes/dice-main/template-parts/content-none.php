<?php
/**
 * Template part for displaying a message when posts are not found.
 *
 * @package Dice
 */

declare(strict_types=1);

?>
<section class="no-results not-found">
		<header class="page-header">
				<h2 class="page-title"><?php esc_html_e( 'Nothing Found', 'dice' ); ?></h2>
		</header>

		<div class="page-content">
				<?php if ( is_home() && current_user_can( 'publish_posts' ) ) : ?>
						<p>
								<?php
								printf(
									wp_kses(
												/* translators: %s: new post admin URL. */
										__( 'Ready to publish your first post? <a href="%s">Get started here</a>.', 'dice' ),
										array(
											'a' => array(
												'href' => array(),
											),
										)
									),
									esc_url( admin_url( 'post-new.php' ) )
								);
								?>
						</p>
				<?php elseif ( is_search() ) : ?>
						<p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'dice' ); ?></p>
						<?php get_search_form(); ?>
				<?php else : ?>
						<p><?php esc_html_e( 'It seems we can\'t find what you\'re looking for. Perhaps searching can help.', 'dice' ); ?></p>
						<?php get_search_form(); ?>
				<?php endif; ?>
		</div>
</section>
