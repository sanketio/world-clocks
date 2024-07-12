import '../../css/frontend/style.css';

import { getDateTimeFormat } from './utils';

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
		const showClocksAmPmIndicator =
			wpClocks?.dataset?.showclocksampmindicator &&
			wpClocks?.dataset?.showclocksampmindicator !== '';
		const timeFormat = wpClocks?.dataset?.timeformat || 'h:i:s A';

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
			};

			const hourFormat = ['g', 'h', 'G', 'H'].find((format) => timeFormat.includes(format));
			if (hourFormat) {
				timeStringSettings.hour12 = !['G', 'H'].includes(hourFormat);
				timeStringSettings.hour = ['g', 'G'].includes(hourFormat) ? 'numeric' : '2-digit';
			}

			if (timeFormat.includes('i')) {
				timeStringSettings.minute = '2-digit';
			}

			if (timeFormat.includes('s')) {
				timeStringSettings.second = '2-digit';
			}

			/**
			 * Update time every second.
			 */
			const updateTime = () => {
				// Update new time to the state.
				const { time, hours, minutes, seconds, ampm } = getDateTimeFormat(
					new Date().toLocaleTimeString('en-US', timeStringSettings),
					timeFormat,
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
