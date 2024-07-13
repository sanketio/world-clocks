import '../../css/frontend/style.css';

import { getDateTimeData } from '../utils';

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
		const dateFormat = wpClocks?.dataset?.dateformat || 'Y-m-d';

		// Loop through each clock block.
		childClocks.forEach((singleClock) => {
			// Find the timezone for the clock.
			const timezone = singleClock?.dataset?.timezone || 'UTC';
			let validTimezone = timezone;
			let manualOffset = false;
			if (
				timezone.toUpperCase().includes('UTC-') ||
				timezone.toUpperCase().includes('UTC+')
			) {
				validTimezone = timezone.replace('UTC', '');
				manualOffset = true;
			}

			// Find the relevant child elements for the single clock.
			const digitalClockElement = singleClock.querySelector('.digital-clock');
			const dateElement = singleClock.querySelector('.clock-date');
			const analogClockIndicator = singleClock.querySelector('.analog-clock .indicator');
			const analogClockHourHand = singleClock.querySelector('.analog-clock .hour');
			const analogClockMinuteHand = singleClock.querySelector('.analog-clock .minute');
			const analogClockSecondHand = singleClock.querySelector('.analog-clock .second');

			/**
			 * Update time every second.
			 */
			const updateTime = () => {
				// Update new time to the state.
				const { timeString, dateString, hours, minutes, seconds, ampm } = getDateTimeData(
					validTimezone,
					timeFormat,
					manualOffset,
					dateFormat,
				);

				if (digitalClockElement) {
					digitalClockElement.innerText = timeString;
				}

				if (dateElement) {
					dateElement.innerText = dateString;
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

			updateTime();

			// Set interval to update time every second.
			setInterval(updateTime, 1000);
		});
	});
};

window.addEventListener('DOMContentLoaded', () => {
	outputClock();
});
