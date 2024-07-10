<?php
/**
 * Gutenberg Blocks setup
 *
 * @package world-clocks
 */

namespace WorldClocks\Blocks;

use function WorldClocks\Helpers\get_timezones;

/**
 * Set up blocks
 *
 * @return void
 */
function setup() {

	$n = function ( $func ) {
		return __NAMESPACE__ . "\\$func";
	};

	add_action( 'init', $n( 'register_blocks' ) );
	add_action( 'enqueue_block_editor_assets', $n( 'output_block_settings' ) );
}

/**
 * Automatically registers all blocks that are located within the includes/blocks directory
 *
 * @return void
 */
function register_blocks() {

	// Register all the blocks.
	if ( file_exists( CLOCKS_BLOCK_DIR ) ) {

		$block_json_files = glob( CLOCKS_BLOCK_DIR . '*/block.json' );

		// auto register all blocks that were found.
		foreach ( $block_json_files as $filename ) {

			$block_folder = dirname( $filename );

			$block_options = [];

			$markup_file_path = $block_folder . '/markup.php';
			if ( file_exists( $markup_file_path ) ) {

				// only add the render callback if the block has a file called markup.php in it's directory
				$block_options['render_callback'] = function ( $attributes, $content, $block ) use ( $block_folder ) {

					// create helpful variables that will be accessible in markup.php file
					$context = $block->context;

					// get the actual markup from the markup.php file
					ob_start();
					include $block_folder . '/markup.php';
					return ob_get_clean();
				};
			}

			register_block_type_from_metadata( $block_folder, $block_options );
		}
	}
}

/**
 * Output required data to the JS.
 *
 * @return void
 */
function output_block_settings() {

	$data = [
		'timezones' => get_timezones(),
	];

	wp_add_inline_script(
		'world-clocks-clock-editor-script',
		'const SPWPCLOCK = ' . wp_json_encode( $data ),
		'before'
	);
}
