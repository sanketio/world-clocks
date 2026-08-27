<?php
/**
 * World Clocks block markup
 *
 * @package world-clocks
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 * @var array    $context    Block context.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$css_classes = [
	"has-clocks-layout-{$attributes['layout']}",
	"has-clocks-marks-format-{$attributes['marksFormat']}",
	"has-clocks-{$attributes['clocksPerRow']}-columns",
];

if ( ! $attributes['clocksStackOnMobile'] ) {
	$css_classes[] = 'has-clocks-not-stacked-on-mobile';
}

// WordPress 7.1 drops boolean values from get_block_wrapper_attributes(); '1'/'' matches what esc_attr() produced on earlier versions.
$wrapper_attributes = get_block_wrapper_attributes(
	[
		'class'                        => join( ' ', $css_classes ),
		'data-showclocksampmindicator' => $attributes['showClocksAmPmIndicator'] ? '1' : '',
		'data-showdigitaltime'         => $attributes['showDigitalTime'] ? '1' : '',
		'data-timeformat'              => $attributes['timeFormat'],
		'data-showdate'                => $attributes['showDate'] ? '1' : '',
		'data-dateformat'              => $attributes['dateFormat'],
		'data-layout'                  => $attributes['layout'],
		'data-marksformat'             => $attributes['marksFormat'],
	]
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
