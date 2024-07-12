/**
 * WordPress dependencies
 */
import { format } from '@wordpress/date';

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
