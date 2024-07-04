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
import Number from './icons/number';
import Combine from './icons/combine';
import Line from './icons/line';

import './editor.css';

/**
 * Layout settings component.
 *
 * @param {object} props The block props.
 * @param {Function} props.setAttributes Set attributes method.
 * @param {string} props.layout Current layout.
 *
 * @returns {HTMLElement}
 */
const LayoutSettings = ({ setAttributes, layout }) => {
	return (
		<PanelBody title={__('Layout', 'wp-clocks')} className="wp-clocks-toggle-setting">
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

const ShouldShowMarksFormat = (layout) => {
	const allowedLayouts = ['clock', 'clock-reverse'];
	if (allowedLayouts.includes(layout)) {
		return true;
	}

	return false;
};

/**
 * Marks Format settings component.
 *
 * @param {object} props The block props.
 * @param {Function} props.setAttributes Set attributes method.
 * @param {string} props.marksFormat Current marks format.
 *
 * @returns {HTMLElement}
 */
const MarksFormatSettings = ({ setAttributes, marksFormat }) => {
	return (
		<PanelBody title={__('Marks Format', 'wp-clocks')} className="wp-clocks-toggle-setting">
			<ToggleGroupControl
				isBlock
				onChange={(marksFormat) => {
					setAttributes({ marksFormat });
				}}
				value={marksFormat}
				className="wp-clocks-toggle-control"
			>
				<ToggleGroupControlOptionIcon
					value="number"
					icon={Number}
					label={__('Number', 'wp-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="combine"
					icon={Combine}
					label={__('Combine', 'wp-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="line"
					icon={Line}
					label={__('Line', 'wp-clocks')}
				/>
			</ToggleGroupControl>
		</PanelBody>
	);
};

/**
 * Block edit markup.
 *
 * @param {object} props The block props.
 *
 * @returns {HTMLElement} Block edit markup.
 */
const ClocksEditContainer = (props) => {
	const { attributes, setAttributes } = props;
	const { layout, marksFormat } = attributes;

	const shouldShowMarksFormat = ShouldShowMarksFormat(layout);

	const classes = clsx({
		[`has-clocks-layout-${layout}`]: layout,
		[`has-clocks-marks-format-${marksFormat}`]: shouldShowMarksFormat,
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

				{shouldShowMarksFormat && (
					<MarksFormatSettings setAttributes={setAttributes} marksFormat={marksFormat} />
				)}
			</InspectorControls>

			<div {...innerBlocksProps} />
		</>
	);
};

/**
 * Output placeholder HTML markup for the block.
 *
 * @param {object} props The block props.
 *
 * @returns {HTMLElement} Placeholder for the block.
 */
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

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object} props The block props.
 *
 * @returns {HTMLElement} Render the edit screen
 */
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
