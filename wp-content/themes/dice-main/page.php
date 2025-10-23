<?php
/**
 * Template for displaying pages.
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

		get_template_part( 'template-parts/content', 'page' );

	if ( comments_open() || get_comments_number() ) {
			comments_template();
	}
endwhile;
?>
</div>
<?php

get_footer();
