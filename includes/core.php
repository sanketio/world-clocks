<?php
/**
 * Core plugin functionality.
 *
 * @package world-clocks
 */

namespace WorldClocks\Core;

use function WorldClocks\Helpers\get_asset_info;

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
	add_action( 'wp_enqueue_scripts', $n( 'styles' ) );
	add_action( 'wp_enqueue_scripts', $n( 'scripts' ) );
}

/**
 * Enqueue styles for admin.
 *
 * @return void
 */
function admin_styles() {

	$admin_style_data         = get_asset_info( 'admin-style' );
	$admin_style_dependencies = empty( $admin_style_data['dependencies'] ) ? [] : $admin_style_data['dependencies'];
	$admin_style_version      = empty( $admin_style_data['version'] ) ? constant( 'CLOCKS_VERSION' ) : $admin_style_data['version'];

	wp_enqueue_style(
		'world-clocks-admin-style',
		CLOCKS_DIST_URL . 'admin-style.css',
		$admin_style_dependencies,
		$admin_style_version,
	);
}

/**
 * Enqueue styles for frontend.
 *
 * @return void
 */
function styles() {

	if ( ! has_block( 'world-clocks/clocks' ) ) {
		return;
	}

	$frontend_css_data    = get_asset_info( 'frontend' );
	$frontend_css_version = empty( $frontend_css_data['version'] ) ? constant( 'CLOCKS_VERSION' ) : $frontend_css_data['version'];

	wp_enqueue_style(
		'world-clocks-frontend-style',
		CLOCKS_DIST_URL . 'frontend.css',
		[],
		$frontend_css_version,
	);
}

/**
 * Enqueue scripts for frontend.
 *
 * @return void
 */
function scripts() {

	if ( ! has_block( 'world-clocks/clocks' ) ) {
		return;
	}

	$frontend_js_data         = get_asset_info( 'frontend' );
	$frontend_js_dependencies = empty( $frontend_js_data['dependencies'] ) ? [] : $frontend_js_data['dependencies'];
	$frontend_js_version      = empty( $frontend_js_data['version'] ) ? constant( 'CLOCKS_VERSION' ) : $frontend_js_data['version'];

	wp_enqueue_script(
		'world-clocks-frontend-js',
		CLOCKS_DIST_URL . 'frontend.js',
		$frontend_js_dependencies,
		$frontend_js_version,
		true
	);
}
