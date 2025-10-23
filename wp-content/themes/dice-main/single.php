<?php
/**
 * Template for displaying single posts.
 *
 * @package Dice
 */

declare(strict_types=1);

get_header();
?>
<div class="wrapper">
<?php
while ( have_posts() ) :
		the_post();

		get_template_part( 'template-parts/content', get_post_type() );

				the_post_navigation(
					array(
						'prev_text' => '<span class="nav-subtitle">' . esc_html__( 'Previous:', 'dice' ) . '</span> <span class="nav-title">%title</span>',
						'next_text' => '<span class="nav-subtitle">' . esc_html__( 'Next:', 'dice' ) . '</span> <span class="nav-title">%title</span>',
					)
				);
endwhile;
?>
</div>
<?php

get_footer();
