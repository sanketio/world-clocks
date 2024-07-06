<?php
/**
 * Core plugin functionality.
 *
 * @package wp-clocks
 */

namespace Clocks\Core;

use function Clocks\Helpers\get_asset_info;

/**
 * Set up blocks
 *
 * @return void
 */
function setup() {

	$n = function ( $func ) {
		return __NAMESPACE__ . "\\$func";
	};

	add_action( 'admin_enqueue_scripts', $n( 'admin_styles' ) );
}

/**
 * Enqueue styles for admin.
 *
 * @return void
 */
function admin_styles() {

	$admin_style_data         = get_asset_info( 'admin-style', 'version' );
	$admin_style_dependencies = empty( $admin_style_data['dependencies'] ) ? [] : $admin_style_data['dependencies'];
	$admin_style_version      = empty( $admin_style_data['version'] ) ? [] : $admin_style_data['version'];

	wp_enqueue_style(
		'wp-clocks-admin-style',
		CLOCKS_DIST_URL . 'admin-style.css',
		$admin_style_dependencies,
		$admin_style_version,
	);
}
