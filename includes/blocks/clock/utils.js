/**
 * If parent clock block has digital layout set.
 *
 * @param {Array} context Parent block context.
 *
 * @returns {boolean}
 */
export const hasDigitalClockLayout = (context) => {
	// Allowed clock layouts.
	const digitalClockLayouts = ['digital-column', 'digital-row'];

	return (
		digitalClockLayouts.includes(context['parent-clock/layout']) ||
		context['parent-clock/showTimestamp']
	);
};

/**
 * If parent clock block has analog layout set.
 *
 * @param {Array} context Parent block context.
 *
 * @returns {boolean}
 */
export const hasAnalogClockLayout = (context) => {
	return context['parent-clock/layout'] === 'clock';
};

/**
 * If parent clock block has analog reverse layout set.
 *
 * @param {Array} context Parent block context.
 *
 * @returns {boolean}
 */
export const hasAnalogClockReverseLayout = (context) => {
	return context['parent-clock/layout'] === 'clock-reverse';
};

/**
 * Returns timestamp format with hours, minutes and seconds.
 *
 * @param {string} timeString Original timestamp string.
 * @param {Array} context Parent block context.
 *
 * @returns {object}
 */
export const getTimestampFormat = (timeString, context) => {
	let newTimeString = timeString;

	const timeStringData = newTimeString.split(' ');
	const timeData = timeStringData[0].split(':');
	const hours = parseInt(timeData[0], 10);
	const minutes = parseInt(timeData[1], 10);
	const seconds = parseInt(timeData[2], 10);
	let ampm = timeStringData[1] ? `${timeStringData[1]}` : '';

	if (context['parent-clock/display24HoursTimestampFormat']) {
		ampm = hours >= 12 ? 'PM' : 'AM';

		newTimeString = `${newTimeString} ${ampm}`;
	}

	if (!context['parent-clock/displayTimestampSeconds']) {
		newTimeString = `${timeData[0]}:${timeData[1]} ${ampm}`;
	}

	if (context['parent-clock/timestampFormat'] === 'colon-ampm-lowercase') {
		newTimeString = newTimeString.toLowerCase();
	} else if (context['parent-clock/timestampFormat'] === 'colon') {
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
