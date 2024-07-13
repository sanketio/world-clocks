/**
 * WordPress dependencies
 */
import { date, getSettings, setSettings } from '@wordpress/date';

/**
 * Returns timestamp format with hours, minutes and seconds.
 *
 * @param {string} timezone Timezone.
 * @param {string} timeFormat Time format.
 * @param {boolean} manualOffset If manual offset is selected as a timezone.
 * @param {string} dateFormat Date format.
 *
 * @returns {object}
 */
export const getDateTimeData = (
	timezone,
	timeFormat,
	manualOffset = false,
	dateFormat = 'Y-m-d',
) => {
	const originalSettings = getSettings();

	let timezoneSetting = {
		string: timezone,
	};

	if (manualOffset) {
		timezoneSetting = {
			offset: timezone,
		};
	}

	const newSettings = {
		...originalSettings,
		timezone: timezoneSetting,
	};

	setSettings(newSettings);

	const dateString = date(dateFormat, undefined, timezone);
	const timeString = date(timeFormat, undefined, timezone);

	const newDateTime = new Date(`${dateString} ${timeString}`);

	const hours = newDateTime.getHours();
	const minutes = newDateTime.getMinutes();
	const seconds = newDateTime.getSeconds();
	const ampm = hours >= 12 ? 'pm' : 'am';

	setSettings(originalSettings);

	return {
		timeString,
		dateString,
		hours,
		minutes,
		seconds,
		ampm,
	};
};
