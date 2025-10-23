<?php
/**
 * Template part for displaying page content.
 *
 * @package Dice
 */

declare(strict_types=1);

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		</header>

		<div class="entry-content">
				<?php
				the_content();

				wp_link_pages(
					array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'dice' ),
						'after'  => '</div>',
					)
				);
				?>
		</div>

		<?php if ( get_edit_post_link() ) : ?>
				<footer class="entry-footer">
						<?php edit_post_link( esc_html__( 'Edit', 'dice' ), '<span class="edit-link">', '</span>' ); ?>
				</footer>
		<?php endif; ?>
</article>
