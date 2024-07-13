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
	ToggleControl,
	RangeControl,
	TextControl,
	ExternalLink,
} from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, createInterpolateElement } from '@wordpress/element';
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
		clocksStackOnMobile,
		showClocksAmPmIndicator,
		showDigitalTime,
		timeFormat,
		showDate,
		dateFormat,
		layout,
	} = attributes;
	const shouldShowTimeFormatSetting = !shouldShowClockSettings || showDigitalTime;
	const shouldShowColumnSettings = layout !== 'digital-row';

	const [timeFormatError, setTimeFormatError] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [dateFormatError, setDateFormatError] = useState(false); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier

	/**
	 * On key down event for the time format text.
	 *
	 * @param {object} event Fired event for the keys.
	 *
	 * @returns {void}
	 */
	const onKeyDownTimeFormat = (event) => {
		const { key } = event;

		const nonAllowedKeys = [
			'd',
			'j',
			'S',
			'l',
			'D',
			'm',
			'n',
			'F',
			'M',
			'Y',
			'y',
			'c',
			'r',
			'U',
		];
		if (nonAllowedKeys.includes(key)) {
			setTimeFormatError(true);
			event.preventDefault();
		} else {
			setTimeFormatError(false);
		}
	};

	/**
	 * On key down event for the date format text.
	 *
	 * @param {object} event Fired event for the keys.
	 *
	 * @returns {void}
	 */
	const onKeyDownDateFormat = (event) => {
		const { key } = event;

		const nonAllowedKeys = ['a', 'A', 'g', 'h', 'G', 'H', 'i', 's', 'T', 'c', 'r', 'U'];
		if (nonAllowedKeys.includes(key)) {
			setDateFormatError(true);
			event.preventDefault();
		} else {
			setDateFormatError(false);
		}
	};

	return (
		<PanelBody title={__('Visibility Settings', 'world-clocks')}>
			{shouldShowColumnSettings && (
				<>
					<RangeControl
						label={__('Clocks per row', 'world-clocks')}
						value={clocksPerRow}
						onChange={(clocksPerRow) => {
							setAttributes({ clocksPerRow });
						}}
						min={1}
						max={4}
					/>

					<ToggleControl
						label={__('Stack on mobile', 'world-clocks')}
						checked={clocksStackOnMobile}
						onChange={(clocksStackOnMobile) => {
							setAttributes({ clocksStackOnMobile });
						}}
					/>
				</>
			)}

			{shouldShowClockSettings && (
				<>
					<ToggleControl
						label={__('Show Clocks AmPm Indicator', 'world-clocks')}
						checked={showClocksAmPmIndicator}
						onChange={(showClocksAmPmIndicator) => {
							setAttributes({ showClocksAmPmIndicator });
						}}
					/>

					<ToggleControl
						label={__('Show Digital Time', 'world-clocks')}
						checked={showDigitalTime}
						onChange={(showDigitalTime) => {
							setAttributes({ showDigitalTime });
						}}
					/>
				</>
			)}

			{shouldShowTimeFormatSetting && (
				<>
					<TextControl
						label={__('Time Format', 'world-clocks')}
						help={createInterpolateElement(
							__('Enter a time <Link>format string</Link>.', 'world-clocks'),
							{
								Link: (
									<ExternalLink
										href={__(
											'https://wordpress.org/documentation/article/customize-date-and-time-format/',
											'world-clocks',
										)}
									/>
								),
							},
						)}
						value={timeFormat}
						onChange={(timeFormat) => {
							setAttributes({ timeFormat });
						}}
						onKeyDown={onKeyDownTimeFormat}
					/>

					{timeFormatError && (
						<p className="not-allowed-keys-error">
							{__(
								'The date format keys ("d", "j", "S", "l", "D", "m", "n", "F", "M", "Y", "y", "c", "r", "U") are not allowed in time format.',
								'world-clocks',
							)}
						</p>
					)}
				</>
			)}

			<ToggleControl
				label={__('Show Date', 'world-clocks')}
				checked={showDate}
				onChange={(showDate) => {
					setAttributes({ showDate });
				}}
			/>

			{showDate && (
				<>
					<TextControl
						label={__('Date Format', 'world-clocks')}
						help={createInterpolateElement(
							__('Enter a date <Link>format string</Link>.', 'world-clocks'),
							{
								Link: (
									<ExternalLink
										href={__(
											'https://wordpress.org/documentation/article/customize-date-and-time-format/',
											'world-clocks',
										)}
									/>
								),
							},
						)}
						value={dateFormat}
						onChange={(dateFormat) => {
							setAttributes({ dateFormat });
						}}
						onKeyDown={onKeyDownDateFormat}
					/>

					{dateFormatError && (
						<p className="not-allowed-keys-error">
							{__(
								'The time format keys ("a", "A", "g", "h", "G", "H", "i", "s", "T", "c", "r", "U") are not allowed in date format.',
								'world-clocks',
							)}
						</p>
					)}
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
		<PanelBody title={__('Layout', 'world-clocks')} className="world-clocks-toggle-setting">
			<ToggleGroupControl
				isBlock
				onChange={(layout) => {
					setAttributes({ layout });
				}}
				value={layout}
				className="world-clocks-toggle-control"
			>
				<ToggleGroupControlOptionIcon
					value="digital-row"
					icon={DigitalRow}
					label={__('Digital Row', 'world-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="digital-column"
					icon={DigitalColumn}
					label={__('Digital Column', 'world-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="clock"
					icon={Clock}
					label={__('Clock', 'world-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="clock-reverse"
					icon={ClockReverse}
					label={__('Clock Reverse', 'world-clocks')}
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
		<PanelBody
			title={__('Marks Format', 'world-clocks')}
			className="world-clocks-toggle-setting"
		>
			<ToggleGroupControl
				isBlock
				onChange={(marksFormat) => {
					setAttributes({ marksFormat });
				}}
				value={marksFormat}
				className="world-clocks-toggle-control"
			>
				<ToggleGroupControlOptionIcon
					value="number"
					icon={Number}
					label={__('Number', 'world-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="combine"
					icon={Combine}
					label={__('Combine', 'world-clocks')}
				/>

				<ToggleGroupControlOptionIcon
					value="line"
					icon={Line}
					label={__('Line', 'world-clocks')}
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
	const { layout, marksFormat, clocksPerRow, clocksStackOnMobile } = attributes;

	const shouldShowClockSettings = ShouldShowClockSettings(layout);

	const classes = clsx({
		[`has-clocks-layout-${layout}`]: layout,
		[`has-clocks-marks-format-${marksFormat}`]: shouldShowClockSettings,
		[`has-clocks-${clocksPerRow}-columns`]: clocksPerRow && layout !== 'digital-row',
		'has-clocks-not-stacked-on-mobile': !clocksStackOnMobile,
	});

	const blockProps = useBlockProps({
		className: classes,
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		defaultBlock: {
			name: 'world-clocks/clock',
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
				instructions={__('Select a layout:', 'world-clocks')}
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
