/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	store as blockEditorStore,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	useInnerBlocksProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate, store as blocksStore } from '@wordpress/blocks';
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
	PanelBody,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DigitalColumn from './icons/digital-column';
import DigitalRow from './icons/digital-row';
import Clock from './icons/clock';
import ClockReverse from './icons/clock-reverse';

import './editor.css';

const LayoutSettings = ({ setAttributes, layout }) => {
	return (
		<PanelBody title={__('Layout', 'wp-clocks')} className="wp-clocks-layout-setting">
			<ToggleGroupControl
				isBlock
				onChange={(layout) => {
					setAttributes({ layout });
				}}
				value={layout}
				className="wp-clocks-toggle-control"
			>
				<ToggleGroupControlOptionIcon
					value="digital-column"
					icon={DigitalColumn}
					label={__('Digital Column', 'wp-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="digital-row"
					icon={DigitalRow}
					label={__('Digital Row', 'wp-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="clock"
					icon={Clock}
					label={__('Clock', 'wp-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="clock-reverse"
					icon={ClockReverse}
					label={__('Clock Reverse', 'wp-clocks')}
				/>
			</ToggleGroupControl>
		</PanelBody>
	);
};

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object} props The block props.
 *
 * @returns {Function} Render the edit screen
 */
const ClocksEditContainer = (props) => {
	const { attributes, setAttributes } = props;
	const { layout } = attributes;

	const classes = clsx({
		[`has-layout-clocks-${layout}`]: layout,
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		defaultBlock: 'wp-clocks/clock',
		directInsert: true,
		renderAppender: false,
	});

	return (
		<>
			<InspectorControls>
				<LayoutSettings setAttributes={setAttributes} layout={layout} />
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
};

const Placeholder = (props) => {
	const { clientId, name, setAttributes } = props;
	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const { getBlockVariations, getBlockType, getDefaultBlockVariation } =
				select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[name],
	);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<BlockVariationPicker
				icon={blockType?.icon?.src}
				label={blockType?.title}
				variations={variations}
				instructions={__('Select a layout:', 'wp-clocks')}
				onSelect={(nextVariation = defaultVariation) => {
					if (nextVariation.attributes) {
						setAttributes(nextVariation.attributes);
					}

					if (nextVariation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
							true,
						);
					}
				}}
				allowSkip
			/>
		</div>
	);
};

const ClocksBlockEdit = (props) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		(select) => select(blockEditorStore).getBlocks(clientId).length > 0,
		[clientId],
	);
	const Component = hasInnerBlocks ? ClocksEditContainer : Placeholder;

	return <Component {...props} />;
};

export default ClocksBlockEdit;
