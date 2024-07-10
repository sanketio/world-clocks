<?php
/**
 * Plugin helper functions.
 *
 * @package world-clocks
 */

namespace WorldClocks\Helpers;

/**
 * Get list of timezones.
 *
 * @param string $locale Optional. Locale to load the timezones in. Default current site locale.
 *
 * @return array
 */
function get_timezones( $locale = null ) {

	// Allowed continents.
	$continents = [ 'Africa', 'America', 'Antarctica', 'Arctic', 'Asia', 'Atlantic', 'Australia', 'Europe', 'Indian', 'Pacific' ];

	static $mo_loaded = false, $locale_loaded = null;

	// Load translations for continents and cities.
	if ( ! $mo_loaded || $locale !== $locale_loaded ) {

		$locale_loaded = $locale ? $locale : get_locale();
		$mofile        = WP_LANG_DIR . '/continents-cities-' . $locale_loaded . '.mo';

		unload_textdomain( 'continents-cities', true );
		load_textdomain( 'continents-cities', $mofile, $locale_loaded );

		$mo_loaded = true;
	}

	// Save default UTL timezone to the return array.
	$structure = [
		[
			'value'    => 'tUTC',
			'label'    => 'UTC',
			'disabled' => true,
		],
		[
			'value' => 'UTC',
			'label' => 'UTC',
		],
	];

	$added_continents = [];

	// Get the timezones.
	$tz_identifiers = timezone_identifiers_list();

	// Loop through all the timezones and save it to return array with formatted value.
	foreach ( $tz_identifiers as $zone ) {

		$zone = explode( '/', $zone );
		if ( ! in_array( $zone[0], $continents, true ) ) {
			continue;
		}

		// phpcs:disable WordPress.WP.I18n.LowLevelTranslationFunction, WordPress.WP.I18n.NonSingularStringLiteralText
		$continent = empty( $zone[0] ) ? '' : translate( str_replace( '_', ' ', $zone[0] ), 'continents-cities' );
		if ( empty( $continent ) ) {
			continue;
		}

		$city    = empty( $zone[1] ) ? '' : translate( str_replace( '_', ' ', $zone[1] ), 'continents-cities' );
		$subcity = empty( $zone[2] ) ? '' : translate( str_replace( '_', ' ', $zone[2] ), 'continents-cities' );
		// phpcs:enable WordPress.WP.I18n.LowLevelTranslationFunction, WordPress.WP.I18n.NonSingularStringLiteralText

		$value  = empty( $city ) ? '' : $city;
		$value .= empty( $subcity ) ? '' : "/{$subcity}";
		if ( empty( $value ) ) {
			continue;
		}

		if ( ! in_array( $continent, $added_continents, true ) ) {

			$structure[] = [
				'value'    => "t{$continent}",
				'label'    => $continent,
				'disabled' => true,
			];

			$added_continents[] = $continent;
		}

		$structure[] = [
			'value' => "{$continent}/{$value}",
			'label' => $value,
		];
	}

	// Manual offset range.
	$offset_range = array(
		-12,
		-11.5,
		-11,
		-10.5,
		-10,
		-9.5,
		-9,
		-8.5,
		-8,
		-7.5,
		-7,
		-6.5,
		-6,
		-5.5,
		-5,
		-4.5,
		-4,
		-3.5,
		-3,
		-2.5,
		-2,
		-1.5,
		-1,
		-0.5,
		0,
		0.5,
		1,
		1.5,
		2,
		2.5,
		3,
		3.5,
		4,
		4.5,
		5,
		5.5,
		5.75,
		6,
		6.5,
		7,
		7.5,
		8,
		8.5,
		8.75,
		9,
		9.5,
		10,
		10.5,
		11,
		11.5,
		12,
		12.75,
		13,
		13.75,
		14,
	);

	$structure[] = [
		'value'    => 'tManual Offsets',
		'label'    => __( 'Manual Offsets', 'world-clocks' ),
		'disabled' => true,
	];

	foreach ( $offset_range as $offset ) {

		$offset_name = 0 <= $offset ? '+' . $offset : $offset;
		$offset_name = str_replace( [ '.25', '.5', '.75' ], [ ':15', ':30', ':45' ], $offset_name );

		$structure[] = [
			'value' => "UTC{$offset_name}",
			'label' => "UTC{$offset_name}",
		];
	}

	return $structure;
}

/**
 * Get asset info from extracted asset files
 *
 * @param string $slug Asset slug as defined in build/webpack configuration
 * @param string $attribute Optional attribute to get. Can be version or dependencies
 *
 * @return string|array
 */
function get_asset_info( $slug, $attribute = null ) {

	if ( file_exists( CLOCKS_DIST_DIR . $slug . '.asset.php' ) ) {
		$asset = require CLOCKS_DIST_DIR . $slug . '.asset.php';
	} elseif ( file_exists( CLOCKS_DIST_DIR . $slug . '.asset.php' ) ) {
		$asset = require CLOCKS_DIST_DIR . $slug . '.asset.php';
	} else {
		return null;
	}

	if ( ! empty( $attribute ) && isset( $asset[ $attribute ] ) ) {
		return $asset[ $attribute ];
	}

	return $asset;
}

/**
 * If parent clock block has digital layout set.
 *
 * @param array $context Parent block context.
 *
 * @return bool
 */
function has_digital_clock_layout( $context ) {

	// Allowed clock layouts.
	$digital_clock_layouts = [ 'digital-column', 'digital-row' ];

	return in_array( $context['world-clocks/layout'], $digital_clock_layouts, true ) || $context['world-clocks/showTimestamp'];
};

/**
 * If parent clock block has analog layout set.
 *
 * @param array $context Parent block context.
 *
 * @return bool
 */
function has_analog_clock_layout( $context ) {
	return 'clock' === $context['world-clocks/layout'];
}

/**
 * If parent clock block has analog reverse layout set.
 *
 * @param array $context Parent block context.
 *
 * @return bool
 */
function has_analog_clock_reverse_layout( $context ) {
	return 'clock-reverse' === $context['world-clocks/layout'];
};
