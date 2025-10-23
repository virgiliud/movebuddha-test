<?php
/**
 * Footer template.
 *
 * @package Dice
 */

declare(strict_types=1);

?>
</main>
<footer class="site-footer">
	<div class="site-footer__inner">
	<div class="site-footer__content">

		<!-- Disclaimer -->
		<div class="site-footer__disclaimer">
		<p>
			<strong>Disclaimer:</strong>
			<?php esc_html_e( 'moveBuddha is not a financial advisor. This page is for informational purposes only. Consult a licensed fiduciary before making financial decisions.', 'dice' ); ?>
		</p>
		</div>

		<!-- Navigation -->
		<nav class="site-footer__nav" aria-label="<?php esc_attr_e( 'Footer Menu', 'dice' ); ?>">
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'footer',
				'menu_class'     => 'site-footer__list',
				'container'      => false,
			)
		);
		?>
		</nav>

		<!-- Copyright -->
		<div class="site-footer__copy">
		<p>
			<?php
			printf(
				/* translators: %1$s: Copyright year, %2$s: Site name. */
				esc_html__( '© %1$s %2$s. All rights reserved.', 'dice' ),
				esc_html( gmdate( 'Y' ) ),
				esc_html( get_bloginfo( 'name' ) )
			);
			?>
		</p>
		</div>

	</div>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
