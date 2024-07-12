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
		context['world-clocks/showTimestamp']
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
 * @param {Array} context Parent block context.
 * @param {string} manualOffset Manual offset timezone, if available, default 0.
 *
 * @returns {object}
 */
export const getTimestampFormat = (timeString, context, manualOffset = 0) => {
	let newTimeString = timeString;

	const timeStringData = newTimeString.split(' ');
	const timeData = timeStringData[0].split(':');
	let hours = parseInt(timeData[0], 10);
	let minutes = parseInt(timeData[1], 10);
	const seconds = parseInt(timeData[2], 10);
	let ampm = timeStringData[1] ? `${timeStringData[1]}` : '';

	if (manualOffset !== 0) {
		const shouldIncreaseHour = manualOffset.startsWith('+');
		const shouldDecreaseHour = manualOffset.startsWith('-');

		const manualOffsetTime = manualOffset.split(':');
		const hourOffset = parseInt(manualOffsetTime[0], 10);
		const minuteOffset = manualOffsetTime[1] ? parseInt(manualOffsetTime[1], 10) : 0;

		let hourDifference = hours + hourOffset;
		let minuteDifference = minutes + minuteOffset;
		if (minuteDifference >= 60) {
			minuteDifference -= 60;

			if (shouldIncreaseHour) {
				hourDifference += 1;
			}
		}

		if (minuteDifference !== minutes && shouldDecreaseHour) {
			hourDifference -= 1;
		}

		if (hourDifference < 0) {
			hourDifference = 24 + hourDifference;
		}

		hourDifference =
			context['world-clocks/display24HoursTimestampFormat'] && hourDifference >= 24
				? hourDifference - 24
				: hourDifference;

		ampm = hourDifference >= 12 ? 'PM' : 'AM';

		hourDifference =
			!context['world-clocks/display24HoursTimestampFormat'] && hourDifference > 12
				? hourDifference - 12
				: hourDifference;

		hours = hourDifference;
		minutes = minuteDifference;
	}

	const hourString = hours < 10 ? `0${hours}` : hours;
	const minuteString = minutes < 10 ? `0${minutes}` : minutes;
	const secondString = seconds < 10 ? `0${seconds}` : seconds;

	if (!ampm) {
		ampm = hours >= 12 ? 'PM' : 'AM';
	}

	newTimeString = newTimeString.toUpperCase().includes(ampm)
		? newTimeString
		: `${newTimeString} ${ampm}`;

	if (!context['world-clocks/displayTimestampSeconds']) {
		newTimeString = `${hourString}:${minuteString} ${ampm}`;
	} else {
		newTimeString = `${hourString}:${minuteString}:${secondString} ${ampm}`;
	}

	if (context['world-clocks/timestampFormat'] === 'colon-ampm-lowercase') {
		newTimeString = newTimeString.toLowerCase();
	} else if (context['world-clocks/timestampFormat'] === 'colon') {
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
