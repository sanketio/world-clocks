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
		'-12',
		'-11:30',
		'-11',
		'-10:30',
		'-10',
		'-09:30',
		'-09',
		'-08:30',
		'-08',
		'-07:30',
		'-07',
		'-06:30',
		'-06',
		'-05:30',
		'-05',
		'-04:30',
		'-04',
		'-03:30',
		'-03',
		'-02:30',
		'-02',
		'-01:30',
		'-01',
		'-00:30',
		'+00:30',
		'+01',
		'+01:30',
		'+02',
		'+02:30',
		'+03',
		'+03:30',
		'+04',
		'+04:30',
		'+05',
		'+05:30',
		'+05:45',
		'+06',
		'+06:30',
		'+07',
		'+07:30',
		'+08',
		'+08:30',
		'+08:45',
		'+09',
		'+09:30',
		'+10',
		'+10:30',
		'+11',
		'+11:30',
		'+12',
		'+12:45',
		'+13',
		'+13:45',
		'+14',
	);

	$structure[] = [
		'value'    => 'tManual Offsets',
		'label'    => __( 'Manual Offsets', 'world-clocks' ),
		'disabled' => true,
	];

	foreach ( $offset_range as $offset ) {

		$structure[] = [
			'value' => "UTC{$offset}",
			'label' => "UTC{$offset}",
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

	return in_array( $context['world-clocks/layout'], $digital_clock_layouts, true ) || $context['world-clocks/showDigitalTime'];
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
