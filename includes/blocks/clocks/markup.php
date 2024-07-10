<?php
/**
 * Clocks block markup
 *
 * @package world-clocks
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 * @var array    $context    Block context.
 */

$css_classes = [
	"has-clocks-layout-{$attributes['layout']}",
	"has-clocks-marks-format-{$attributes['marksFormat']}",
	"has-clocks-{$attributes['clocksPerRow']}-columns",
];

if ( ! $attributes['clocksStackOnMobile'] ) {
	$css_classes[] = 'has-clocks-not-stacked-on-mobile';
}

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class'                              => join( ' ', $css_classes ),
		'data-showClocksAmPmIndicator'       => $attributes['showClocksAmPmIndicator'],
		'data-showTimestamp'                 => $attributes['showTimestamp'],
		'data-timestampFormat'               => $attributes['timestampFormat'],
		'data-displayTimestampSeconds'       => $attributes['displayTimestampSeconds'],
		'data-display24HoursTimestampFormat' => $attributes['display24HoursTimestampFormat'],
		'data-layout'                        => $attributes['layout'],
		'data-marksFormat'                   => $attributes['marksFormat'],
	]
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
