import { InnerBlocks } from '@wordpress/block-editor';

/**
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#save
 *
 * @returns {null} Dynamic blocks do not save the HTML.
 */
const ClocksBlockSave = () => {
	return <InnerBlocks.Content />;
};

export default ClocksBlockSave;
