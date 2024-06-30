<?php
	/**
	 * Clocks block markup
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
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
