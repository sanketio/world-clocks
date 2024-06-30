<?php
	/**
	 * Clock block markup
	 *
	 * @package wp-clocks
	 *
	 * @var array    $attributes Block attributes.
	 * @var string   $content    Block content.
	 * @var WP_Block $block      Block instance.
	 * @var array    $context    Block context.
	 */

?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<h2 class="wp-block-clock__title">
		<?php echo wp_kses_post( $attributes['title'] ); ?>
	</h2>
</div>
