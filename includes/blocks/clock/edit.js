/**
 * WordPress dependencies
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import TimezoneSelector from './timezone-selector';
import {
	hasDigitalClockLayout,
	hasAnalogClockLayout,
	hasAnalogClockReverseLayout,
	getTimestampFormat,
} from './utils';

import './editor.css';

/**
 * Output clock.
 *
 * @param {object} settings The function attributes.
 * @param {string} settings.timezone Clock timezone.
 * @param {string} settings.clockLabel Clock label.
 * @param {Array} settings.context Parent block context values.
 *
 * @returns {null|HTMLElement}
 */
const Clock = ({ timezone, clockLabel, context }) => {
	const hasDigitalClocks = hasDigitalClockLayout(context);
	const hasAnalogClocks = hasAnalogClockLayout(context);
	const hasAnalogClocksReverse = hasAnalogClockReverseLayout(context);

	// Check if 24 hours format is enabled.
	const shouldUse12HoursTimestampFormat = !context['parent-clock/display24HoursTimestampFormat'];

	// Defailt time string object.
	const timeStringSettings = {
		timeZone: timezone,
		hour12: shouldUse12HoursTimestampFormat,
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};

	// Get the initial time.
	const initialTime = new Date().toLocaleTimeString('en-US', timeStringSettings);
	const { time, hours, minutes, seconds } = getTimestampFormat(initialTime, context);

	// Save initial time in state.
	const [currentTime, setCurrentTime] = useState(time); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentHour, setCurrentHour] = useState(hours); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentMinute, setCurrentMinute] = useState(minutes); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
	const [currentSecond, setCurrentSecond] = useState(seconds); // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier

	/**
	 * Update time every second.
	 */
	const updateTime = () => {
		// Update new time to the state.
		const newTime = new Date().toLocaleTimeString('en-US', timeStringSettings);
		const { time, hours, minutes, seconds } = getTimestampFormat(newTime, context);

		setCurrentTime(time);
		setCurrentHour(hours);
		setCurrentMinute(minutes);
		setCurrentSecond(seconds);
	};

	// Set interval to update time every second.
	useEffect( () => { // eslint-disable-line react-hooks/rules-of-hooks, prettier/prettier
		const intervalId = setInterval(updateTime);

		return () => {
			clearInterval(intervalId);
		};
	});

	return (
		<>
			{(hasAnalogClocks || hasAnalogClocksReverse) && (
				<>
					{hasAnalogClocksReverse && (
						<>
							<p className="clock-label">{clockLabel}</p>

							{hasDigitalClocks && <p className="digital-clock">{currentTime}</p>}
						</>
					)}

					<div className="analog-clock">
						<div className="indicator">
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
							<span>1</span>
						</span>
						<span className="number-indicator two">
							<span>2</span>
						</span>
						<span className="number-indicator three">
							<span>3</span>
						</span>
						<span className="number-indicator four">
							<span>4</span>
						</span>
						<span className="number-indicator five">
							<span>5</span>
						</span>
						<span className="number-indicator six">
							<span>6</span>
						</span>
						<span className="number-indicator seven">
							<span>7</span>
						</span>
						<span className="number-indicator eight">
							<span>8</span>
						</span>
						<span className="number-indicator nine">
							<span>9</span>
						</span>
						<span className="number-indicator ten">
							<span>10</span>
						</span>
						<span className="number-indicator eleven">
							<span>11</span>
						</span>
						<span className="number-indicator twelve">
							<span>12</span>
						</span>
					</div>

					{hasAnalogClocks && (
						<>
							<p className="clock-label">{clockLabel}</p>

							{hasDigitalClocks && <p className="digital-clock">{currentTime}</p>}
						</>
					)}
				</>
			)}

			{hasDigitalClocks && !hasAnalogClocks && !hasAnalogClocksReverse && (
				<>
					<p className="digital-clock">{currentTime}</p>

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
	const { timezone, timezoneLabel } = attributes;

	// Format timezone for Date object.
	const formattedTimezone = timezone.replace(' ', '_');

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<TimezoneSelector {...props} />
			</InspectorControls>

			<div {...blockProps}>
				<Clock timezone={formattedTimezone} clockLabel={timezoneLabel} context={context} />
			</div>
		</>
	);
};

export default ClockBlockEdit;
