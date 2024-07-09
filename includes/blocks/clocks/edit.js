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
	SelectControl,
	ToggleControl,
	RangeControl,
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
import './style.css';

/**
 * Visibility settings component.
 *
 * @param {object} props The block props.
 * @param {Function} props.setAttributes Set attributes method.
 * @param {object} props.attributes Visibility attributes of the block.
 * @param {object} props.shouldShowClockSettings Should show clock settings.
 *
 * @returns {HTMLElement}
 */
const VisibilitySettings = ({ setAttributes, attributes, shouldShowClockSettings }) => {
	const {
		clocksPerRow,
		showClocksAmPmIndicator,
		showTimestamp,
		timestampFormat,
		displayTimestampSeconds,
		display24HoursTimestampFormat,
		layout,
	} = attributes;
	const shouldShowTimestampFormatSetting = !shouldShowClockSettings || showTimestamp;
	const shouldShowClocksPerRow = layout !== 'digital-row';

	return (
		<PanelBody title={__('Visibility Settings', 'wp-clocks')}>
			{shouldShowClocksPerRow && (
				<RangeControl
					label={__('Clocks per row', 'wp-clocks')}
					value={clocksPerRow}
					onChange={(clocksPerRow) => {
						setAttributes({ clocksPerRow });
					}}
					min={1}
					max={4}
				/>
			)}

			{shouldShowClockSettings && (
				<>
					<ToggleControl
						label={__('Show Clocks AmPm Indicator', 'wp-clocks')}
						checked={showClocksAmPmIndicator}
						onChange={(showClocksAmPmIndicator) => {
							setAttributes({ showClocksAmPmIndicator });
						}}
					/>

					<ToggleControl
						label={__('Show Timestamp', 'wp-clocks')}
						checked={showTimestamp}
						onChange={(showTimestamp) => {
							setAttributes({ showTimestamp });
						}}
					/>
				</>
			)}

			{shouldShowTimestampFormatSetting && (
				<>
					<SelectControl
						label={__('Timestamp Format', 'wp-clocks')}
						value={timestampFormat}
						options={[
							{
								label: __('00:00 AM/PM', 'wp-clocks'),
								value: 'colon-ampm-uppercase',
							},
							{
								label: __('00:00 am/pm', 'wp-clocks'),
								value: 'colon-ampm-lowercase',
							},
							{ label: __('00:00', 'wp-clocks'), value: 'colon' },
						]}
						onChange={(timestampFormat) => {
							setAttributes({ timestampFormat });
						}}
					/>

					<ToggleControl
						label={__('Display Timestamp Seconds', 'wp-clocks')}
						checked={displayTimestampSeconds}
						onChange={(displayTimestampSeconds) => {
							setAttributes({ displayTimestampSeconds });
						}}
					/>

					<ToggleControl
						label={__('Display 24 hours Timestamp Format', 'wp-clocks')}
						checked={display24HoursTimestampFormat}
						onChange={(display24HoursTimestampFormat) => {
							setAttributes({ display24HoursTimestampFormat });
						}}
					/>
				</>
			)}
		</PanelBody>
	);
};

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
 * Check it a few settings panel should be outputed.
 *
 * @param {string} layout Layout to check.
 *
 * @returns {boolean}
 */
const ShouldShowClockSettings = (layout) => {
	const allowedLayouts = ['clock', 'clock-reverse'];
	if (allowedLayouts.includes(layout)) {
		return true;
	}

	return false;
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
	const { layout, marksFormat, clocksPerRow } = attributes;

	const shouldShowClockSettings = ShouldShowClockSettings(layout);

	const classes = clsx({
		[`has-clocks-layout-${layout}`]: layout,
		[`has-clocks-marks-format-${marksFormat}`]: shouldShowClockSettings,
		[`has-clocks-${clocksPerRow}-columns`]: clocksPerRow && layout !== 'digital-row',
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		defaultBlock: {
			name: 'wp-clocks/clock',
		},
		directInsert: true,
	});

	return (
		<>
			<InspectorControls>
				<VisibilitySettings
					setAttributes={setAttributes}
					attributes={attributes}
					shouldShowClockSettings={shouldShowClockSettings}
				/>

				<LayoutSettings setAttributes={setAttributes} layout={layout} />

				{shouldShowClockSettings && (
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
