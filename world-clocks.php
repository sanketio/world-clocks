<?php
/**
 * Plugin Name:       World Clocks
 * Plugin URI:        https://wordpress.org/plugins/world-clocks/
 * Description:       Enable world clocks for the sites with different timezones, with a custom block for the WordPress block editor (Gutenberg).
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      8.0
 * Author:            Sanket Parmar
 * Author URI:        https://sanketio.github.io/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       world-clocks
 * Domain Path:       /languages
 *
 * @package world-clocks
 */

namespace WorldClocks;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'CLOCKS_VERSION', '1.0.0' );
define( 'CLOCKS_PLUGIN_DIR', trailingslashit( __DIR__ ) );
define( 'CLOCKS_PLUGIN_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );
define( 'CLOCKS_BLOCK_DIR', CLOCKS_PLUGIN_DIR . 'includes/blocks/' );
define( 'CLOCKS_DIST_DIR', CLOCKS_PLUGIN_DIR . 'dist/' );
define( 'CLOCKS_DIST_URL', CLOCKS_PLUGIN_URL . 'dist/' );

require CLOCKS_PLUGIN_DIR . 'includes/helpers.php';

require CLOCKS_PLUGIN_DIR . 'includes/core.php';
Core\setup();

require CLOCKS_PLUGIN_DIR . 'includes/blocks.php';
Blocks\setup();
