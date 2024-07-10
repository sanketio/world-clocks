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

use function Clocks\Helpers\has_analog_clock_layout;
use function Clocks\Helpers\has_analog_clock_reverse_layout;
use function Clocks\Helpers\has_digital_clock_layout;

$has_digital_clocks        = has_digital_clock_layout( $context );
$has_analog_clocks         = has_analog_clock_layout( $context );
$has_analog_clocks_reverse = has_analog_clock_reverse_layout( $context );

$has_marks_format_line    = 'line' === $context['parent-clock/marksFormat'];
$has_marks_format_combine = 'combine' === $context['parent-clock/marksFormat'];

$wrapper_attributes = get_block_wrapper_attributes(
	[
		'data-timezone' => $attributes['timezone'],
	]
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $has_analog_clocks || $has_analog_clocks_reverse ) : ?>
		<?php if ( $has_analog_clocks_reverse ) : ?>
			<p class="clock-label">
				<?php echo esc_html( $attributes['timezoneLabel'] ); ?>
			</p>

			<?php if ( $has_digital_clocks ) : ?>
				<p class="digital-clock"></p>
			<?php endif; ?>
		<?php endif; ?>

		<div class="analog-clock">
			<div class="indicator">
				<span class="hand hour"></span>
				<span class="hand minute"></span>
				<span class="hand second"></span>

				<span class="number-indicator one">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '1';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator two">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '2';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator three">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line ? '|' : '3';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator four">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '4';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator five">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '5';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator six">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line ? '|' : '6';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator seven">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '7';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator eight">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '8';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator nine">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line ? '|' : '9';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator ten">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '10';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator eleven">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line || $has_marks_format_combine ? '|' : '11';
						echo esc_html( $value );
						?>
					</span>
				</span>
				<span class="number-indicator twelve">
					<span class="<?php echo esc_attr( $context['parent-clock/marksFormat'] ); ?>">
						<?php
						$value = $has_marks_format_line ? '|' : '12';
						echo esc_html( $value );
						?>
					</span>
				</span>
			</div>
		</div>

		<?php if ( $has_analog_clocks ) : ?>
			<p class="clock-label">
				<?php echo esc_html( $attributes['timezoneLabel'] ); ?>
			</p>

			<?php if ( $has_digital_clocks ) : ?>
				<p class="digital-clock"></p>
			<?php endif; ?>
		<?php endif; ?>
	<?php endif; ?>

	<?php if ( $has_digital_clocks && ! $has_analog_clocks && ! $has_analog_clocks_reverse ) : ?>
		<p class="digital-clock"></p>

		<p class="clock-label">
			<?php echo esc_html( $attributes['timezoneLabel'] ); ?>
		</p>
	<?php endif; ?>
</div>
