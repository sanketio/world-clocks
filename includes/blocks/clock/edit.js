/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TimezoneSelector from './timezone-selector';
import { getDateTimeData } from '../../../assets/js/utils';

import './editor.css';
import './style.css';

/**
 * Output clock.
 *
 * @param {object} settings The function attributes.
 * @param {string} settings.timezone Clock timezone.
 * @param {string} settings.clockLabel Clock label.
 * @param {Array} settings.context Parent block context values.
 *
 * @returns {HTMLElement}
 */
const Clock = ({ timezone, clockLabel, context }) => {
	// World clocks layout flags.
	const hasDigitalClocks =
		['digital-column', 'digital-row'].includes(context['world-clocks/layout']) ||
		context['world-clocks/showDigitalTime'];
	const hasAnalogClocks = context['world-clocks/layout'] === 'clock';
	const hasAnalogClocksReverse = context['world-clocks/layout'] === 'clock-reverse';

	let validTimezone = timezone;
	let manualOffset = false;
	if (timezone.toUpperCase().includes('UTC-') || timezone.toUpperCase().includes('UTC+')) {
		validTimezone = timezone.replace('UTC', '');
		manualOffset = true;
	}

	// Get the initial time.
	const { timeString, dateString, hours, minutes, seconds, ampm } = getDateTimeData(
		validTimezone,
		context['world-clocks/timeFormat'],
		manualOffset,
		context['world-clocks/dateFormat'],
	);

	// Save initial time in state.
	const [currentTimeString, setCurrentTimeString] = useState(timeString); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentDateString, setCurrentDateString] = useState(dateString); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentHour, setCurrentHour] = useState(hours); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentMinute, setCurrentMinute] = useState(minutes); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentSecond, setCurrentSecond] = useState(seconds); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentAmPm, setCurrentAmPm] = useState(ampm); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier

	/**
	 * Update time every second.
	 */
	const updateTime = () => {
		// Update new time to the state.
		const { timeString, dateString, hours, minutes, seconds, ampm } = getDateTimeData(
			validTimezone,
			context['world-clocks/timeFormat'],
			manualOffset,
			context['world-clocks/dateFormat'],
		);

		setCurrentTimeString(timeString);
		setCurrentDateString(dateString);
		setCurrentHour(hours);
		setCurrentMinute(minutes);
		setCurrentSecond(seconds);
		setCurrentAmPm(ampm);
	};

	// Set interval to update time every second.
	useEffect( () => { // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
		const intervalId = setInterval(updateTime);

		return () => {
			clearInterval(intervalId);
		};
	});

	// Indicator CSS class.
	const indicatorClass = clsx({
		[`${currentAmPm}`]: context['world-clocks/showClocksAmPmIndicator'],
	});

	const hasMarksFormatLine = context['world-clocks/marksFormat'] === 'line';
	const hasMarksFormatCombine = context['world-clocks/marksFormat'] === 'combine';

	// Marks format CSS class.
	const marksFormatClass = clsx({
		[`${context['world-clocks/marksFormat']}`]: context['world-clocks/marksFormat'],
	});

	return (
		<>
			{(hasAnalogClocks || hasAnalogClocksReverse) && (
				<>
					{hasAnalogClocksReverse && (
						<>
							<p className="clock-label">{clockLabel}</p>

							{(hasDigitalClocks || context['world-clocks/showDate']) && (
								<p className="clock-datetime">
									{hasDigitalClocks && (
										<span className="digital-clock">{currentTimeString}</span>
									)}

									{context['world-clocks/showDate'] && (
										<span className="clock-date">{currentDateString}</span>
									)}
								</p>
							)}
						</>
					)}

					<div className="analog-clock">
						<div className={`indicator ${indicatorClass}`}>
							<span
								className="hand hour"
								style={{
									transform: `rotate(${currentHour * 30 + currentMinute * (360 / 720)}deg)`,
								}}
							/>
							<span
								className="hand minute"
								style={{
									transform: `rotate(${currentMinute * 6 + currentSecond * (360 / 3600)}deg)`,
								}}
							/>
							<span
								className="hand second"
								style={{
									transform: `rotate(${currentSecond * 6}deg)`,
								}}
							/>
						</div>

						<span className="number-indicator one">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '1'}
							</span>
						</span>
						<span className="number-indicator two">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '2'}
							</span>
						</span>
						<span className="number-indicator three">
							<span className={marksFormatClass}>
								{hasMarksFormatLine ? '|' : '3'}
							</span>
						</span>
						<span className="number-indicator four">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '4'}
							</span>
						</span>
						<span className="number-indicator five">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '5'}
							</span>
						</span>
						<span className="number-indicator six">
							<span className={marksFormatClass}>
								{hasMarksFormatLine ? '|' : '6'}
							</span>
						</span>
						<span className="number-indicator seven">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '7'}
							</span>
						</span>
						<span className="number-indicator eight">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '8'}
							</span>
						</span>
						<span className="number-indicator nine">
							<span className={marksFormatClass}>
								{hasMarksFormatLine ? '|' : '9'}
							</span>
						</span>
						<span className="number-indicator ten">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '10'}
							</span>
						</span>
						<span className="number-indicator eleven">
							<span className={marksFormatClass}>
								{hasMarksFormatLine || hasMarksFormatCombine ? '|' : '11'}
							</span>
						</span>
						<span className="number-indicator twelve">
							<span className={marksFormatClass}>
								{hasMarksFormatLine ? '|' : '12'}
							</span>
						</span>
					</div>

					{hasAnalogClocks && (
						<>
							<p className="clock-label">{clockLabel}</p>

							{(hasDigitalClocks || context['world-clocks/showDate']) && (
								<p className="clock-datetime">
									{hasDigitalClocks && (
										<span className="digital-clock">{currentTimeString}</span>
									)}

									{context['world-clocks/showDate'] && (
										<span className="clock-date">{currentDateString}</span>
									)}
								</p>
							)}
						</>
					)}
				</>
			)}

			{hasDigitalClocks && !hasAnalogClocks && !hasAnalogClocksReverse && (
				<>
					<p className="clock-datetime">
						<span className="digital-clock">{currentTimeString}</span>

						{context['world-clocks/showDate'] && (
							<span className="clock-date">{currentDateString}</span>
						)}
					</p>

					<p className="clock-label">{clockLabel}</p>
				</>
			)}
		</>
	);
};

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.className        Class name for the block.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 *
 * @returns {Function} Render the edit screen
 */
const ClockBlockEdit = (props) => {
	const { attributes, context } = props;
	const { timezone, clockLabel } = attributes;

	// Format timezone for Date object.
	const formattedTimezone = timezone.replace(' ', '_');

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<TimezoneSelector {...props} />
			</InspectorControls>

			<div {...blockProps}>
				<Clock timezone={formattedTimezone} clockLabel={clockLabel} context={context} />
			</div>
		</>
	);
};

export default ClockBlockEdit;
