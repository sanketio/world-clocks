<?php
/**
 * Gutenberg Blocks setup
 *
 * @package wp-clocks
 */

namespace Clocks\Blocks;

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
