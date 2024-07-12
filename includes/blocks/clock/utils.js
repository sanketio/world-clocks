/**
 * WordPress dependencies
 */
import { format } from '@wordpress/date';

/**
 * If world clocks block has digital layout set.
 *
 * @param {Array} context Parent block context.
 *
 * @returns {boolean}
 */
export const hasDigitalClockLayout = (context) => {
	// Allowed clock layouts.
	const digitalClockLayouts = ['digital-column', 'digital-row'];

	return (
		digitalClockLayouts.includes(context['world-clocks/layout']) ||
		context['world-clocks/showDigitalTime']
	);
};

/**
 * If world clocks block has analog layout set.
 *
 * @param {Array} context Parent block context.
 *
 * @returns {boolean}
 */
export const hasAnalogClockLayout = (context) => {
	return context['world-clocks/layout'] === 'clock';
};

/**
 * If world clocks block has analog reverse layout set.
 *
 * @param {Array} context Parent block context.
 *
 * @returns {boolean}
 */
export const hasAnalogClockReverseLayout = (context) => {
	return context['world-clocks/layout'] === 'clock-reverse';
};

/**
 * Returns timestamp format with hours, minutes and seconds.
 *
 * @param {string} timeString Original timestamp string.
 * @param {string} timeFormat Time format.
 * @param {string} manualOffset Manual offset timezone, if available, default 0.
 *
 * @returns {object}
 */
export const getDateTimeFormat = (timeString, timeFormat, manualOffset = 0) => {
	console.log(manualOffset);
	const newDateTime = new Date(`2024-07-12 ${timeString}`);

	const hours = newDateTime.getHours();
	const minutes = newDateTime.getMinutes();
	const seconds = newDateTime.getSeconds();
	const ampm = hours >= 12 ? 'pm' : 'am';

	return {
		time: format(timeFormat, newDateTime),
		hours,
		minutes,
		seconds,
		ampm,
	};
};
