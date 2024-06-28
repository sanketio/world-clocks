
/**
 * Clocks block.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

import variations from './variations';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import block from './block.json';

/**
 * Register block
 */
registerBlockType(block, {
	variations,
	edit,
	save,
});
