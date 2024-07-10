/**
 * World Clocks block.
 */

/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import WorldClocks from './icons/world-clocks';
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
	icon: WorldClocks,
	variations,
	edit,
	save,
});
