import '../../css/frontend/style.css';

import { getTimestampFormat } from './utils';

const outputClock = () => {
	// Fetch all the parent clock blocks element, if not found, return early.
	const wpClocksAll = document.querySelectorAll('.wp-block-world-clocks-clocks');
	if (!wpClocksAll.length) {
		return;
	}

	// Loop through each parent clock.
	wpClocksAll.forEach((wpClocks) => {
		// Find child clocks inside parent clock wrapper, if not found, return.
		const childClocks = wpClocks.querySelectorAll('.wp-block-world-clocks-clock');
		if (!childClocks.length) {
			return;
		}

		// Settings for the clocks.
		const display24HoursTimestampFormat =
			wpClocks?.dataset?.display24hourstimestampformat &&
			wpClocks?.dataset?.display24hourstimestampformat !== '';
		const displayTimestampSeconds =
			wpClocks?.dataset?.displaytimestampseconds &&
			wpClocks?.dataset?.displaytimestampseconds !== '';
		const showClocksAmPmIndicator =
			wpClocks?.dataset?.showclocksampmindicator &&
			wpClocks?.dataset?.showclocksampmindicator !== '';
		const timestampFormat = wpClocks?.dataset?.timestampformat || 'colon-ampm-uppercase';

		// Loop through each clock block.
		childClocks.forEach((singleClock) => {
			// Find the timezone for the clock.
			const timezone = singleClock?.dataset?.timezone || 'UTC';
			let validTimezone = timezone;
			let manualOffset = 0;
			if (
				timezone.toUpperCase().includes('UTC-') ||
				timezone.toUpperCase().includes('UTC+')
			) {
				manualOffset = timezone.replace('UTC', '');
				validTimezone = 'UTC';
			}

			// Find the relevant child elements for the single clock.
			const digitalClockElement = singleClock.querySelector('.digital-clock');
			const analogClockIndicator = singleClock.querySelector('.analog-clock .indicator');
			const analogClockHourHand = singleClock.querySelector('.analog-clock .hour');
			const analogClockMinuteHand = singleClock.querySelector('.analog-clock .minute');
			const analogClockSecondHand = singleClock.querySelector('.analog-clock .second');

			// Default time string object.
			const timeStringSettings = {
				timeZone: validTimezone,
				hour12: !display24HoursTimestampFormat,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			};

			/**
			 * Update time every second.
			 */
			const updateTime = () => {
				// Update new time to the state.
				const newTime = new Date().toLocaleTimeString('en-US', timeStringSettings);
				const { time, hours, minutes, seconds, ampm } = getTimestampFormat(
					newTime,
					{
						display24HoursTimestampFormat,
						displayTimestampSeconds,
						timestampFormat,
					},
					manualOffset,
				);

				if (digitalClockElement) {
					digitalClockElement.innerText = time;
				}

				if (analogClockIndicator) {
					if (showClocksAmPmIndicator) {
						analogClockIndicator.classList.add(`${ampm}`);
					} else {
						analogClockIndicator.classList.remove(`${ampm}`);
					}
				}

				if (analogClockHourHand) {
					analogClockHourHand.style.transform = `rotate(${hours * 30 + minutes * (360 / 720)}deg)`;
				}

				if (analogClockMinuteHand) {
					analogClockMinuteHand.style.transform = `rotate(${minutes * 6 + seconds * (360 / 3600)}deg)`;
				}

				if (analogClockSecondHand) {
					analogClockSecondHand.style.transform = `rotate(${seconds * 6}deg)`;
				}
			};

			// Set interval to update time every second.
			setInterval(updateTime);

			updateTime();
		});
	});
};

window.addEventListener('DOMContentLoaded', () => {
	outputClock();
});
