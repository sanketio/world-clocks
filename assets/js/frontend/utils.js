/**
 * Returns timestamp format with hours, minutes and seconds.
 *
 * @param {string} timeString Original timestamp string.
 * @param {object} settings Parent block settings.
 *
 * @returns {object}
 */
export const getTimestampFormat = (timeString, settings) => {
	let newTimeString = timeString;

	const timeStringData = newTimeString.split(' ');
	const timeData = timeStringData[0].split(':');
	const hours = parseInt(timeData[0], 10);
	const minutes = parseInt(timeData[1], 10);
	const seconds = parseInt(timeData[2], 10);
	let ampm = timeStringData[1] ? `${timeStringData[1]}` : '';

	if (settings.display24HoursTimestampFormat) {
		ampm = hours >= 12 ? 'PM' : 'AM';

		newTimeString = `${newTimeString} ${ampm}`;
	}

	if (!settings.displayTimestampSeconds) {
		newTimeString = `${timeData[0]}:${timeData[1]} ${ampm}`;
	}

	if (settings.timestampFormat === 'colon-ampm-lowercase') {
		newTimeString = newTimeString.toLowerCase();
	} else if (settings.timestampFormat === 'colon') {
		newTimeString = newTimeString.toLowerCase().replace(/ am| pm/gi, '');
	}

	return {
		time: newTimeString,
		hours,
		minutes,
		seconds,
		ampm: ampm.toLowerCase(),
	};
};
