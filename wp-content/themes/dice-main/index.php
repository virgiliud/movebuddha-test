<?php
/**
 * The main template file.
 *
 * @package Dice
 */

declare(strict_types=1);

get_header();
?>
<div class="wrapper">
<?php if ( have_posts() ) : ?>
		<?php if ( is_home() && ! is_front_page() ) : ?>
				<header class="page-header mb-10">
						<h1 class="page-title text-3xl font-semibold"><?php echo esc_html( single_post_title( '', false ) ); ?></h1>
				</header>
		<?php endif; ?>

		<div class="space-y-10">
	<?php
	while ( have_posts() ) :
		the_post();
		get_template_part( 'template-parts/content', get_post_type() );
	endwhile;
	?>
	</div>

	<div class="mt-12">
		<?php the_posts_navigation(); ?>
	</div>
<?php else : ?>
	<?php get_template_part( 'template-parts/content', 'none' ); ?>
<?php endif; ?>
</div>
<?php
get_footer();
