<?php
/**
 * Template part for displaying content.
 *
 * @package Dice
 */

declare(strict_types=1);

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'space-y-4' ); ?>>
				<header class="entry-header">
								<?php if ( is_singular() ) : ?>
												<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
								<?php else : ?>
												<?php
												the_title(
													sprintf(
														'<h2 class="entry-title text-2xl"><a class="hover:underline" href="%s">',
														esc_url( get_permalink() )
													),
													'</a></h2>'
												);
												?>
								<?php endif; ?>
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

		<footer class="entry-footer">
				<?php edit_post_link( esc_html__( 'Edit', 'dice' ), '<span class="edit-link">', '</span>' ); ?>
		</footer>
</article>
