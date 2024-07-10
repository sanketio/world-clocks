/* global SPWPCLOCK */

/**
 * WordPress dependencies
 */
import { PanelBody, TextControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { UP, DOWN, ENTER, ESCAPE } from '@wordpress/keycodes';

/**
 * Timezone selector component.
 *
 * @param {object} props Block props.
 *
 * @returns {HTMLElement}
 */
const TimezoneSelector = (props) => {
	const { attributes, setAttributes } = props;
	const { timezone, clockLabel } = attributes;
	const { timezones } = SPWPCLOCK;

	const continents = timezones.filter((timezoneObj) => {
		return timezoneObj?.disabled;
	});

	/**
	 * Filter timezones based on the timezone string.
	 *
	 * @param {string} timezoneString Timezone string.
	 *
	 * @returns {Array}
	 */
	const filterTimezones = (timezoneString) => {
		/**
		 * Filter out timezones that contains the user's input and is not disabled.
		 *
		 * Disabled timezones (continents) will be included later.
		 */
		const foundTimezones = timezones.filter((timezoneObj) => {
			return (
				!timezoneObj?.disabled &&
				timezoneObj.value.toLowerCase().includes(timezoneString.toLowerCase())
			);
		});

		const finalTimezones = [];
		const availedTimezones = [];

		// Loop through filtered timezones and inject Timezone continents.
		foundTimezones.forEach((timezoneObj) => {
			let continentClockLabel = 'UTC';
			if (timezoneObj.value.includes('/')) {
				// Get the continent name
				const continentTimezone = timezoneObj.value.split('/');

				continentClockLabel = continentTimezone[0];
			} else if (
				timezoneObj.value.includes(`${continentClockLabel}-`) ||
				timezoneObj.value.includes(`${continentClockLabel}+`)
			) {
				continentClockLabel = 'Manual Offsets';
			}

			// Check if continent name is already been included.
			if (!availedTimezones.includes(continentClockLabel)) {
				// Filter the right continent name for the timezones.
				const timezone = continents.filter((continent) => {
					return continent.label === continentClockLabel;
				});

				// Push the continent to the final list.
				finalTimezones.push(timezone[0]);

				// Mark the continent as availed.
				availedTimezones.push(continentClockLabel);
			}

			// Push the timezone to the final list.
			finalTimezones.push(timezoneObj);
		});

		return finalTimezones;
	};

	// Default values.
	const defaultUserInput = timezone || 'UTC';
	const defaultFilteredTimezones = timezone ? filterTimezones(timezone) : timezones;

	const [activeTimezone, setActiveSuggestion] = useState(1);
	const [filteredTimezones, setFilteredTimezones] = useState(defaultFilteredTimezones);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [userInput, setUserInput] = useState(defaultUserInput);

	/**
	 * Disable suggestions on clicking outside the element.
	 *
	 * @param {object} event Fired click event.
	 */
	const handleOutsideClick = (event) => {
		const element = event.target;
		const timezoneSelector = element.closest('.single-clock-timezone-selector');
		if (!timezoneSelector) {
			setShowSuggestions(false);
			setUserInput(defaultUserInput);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});

	/**
	 * On change event for the text control.
	 *
	 * @param {string} value Textbox input string.
	 */
	const onChange = (value) => {
		if (value) {
			const foundTimezones = filterTimezones(value);
			setFilteredTimezones(foundTimezones);
		} else {
			setFilteredTimezones(timezones);
		}

		setActiveSuggestion(1);
		setUserInput(value);
		setShowSuggestions(true);
	};

	/**
	 * On key down event for the suggestions.
	 *
	 * @param {object} event Fired event for the keys.
	 *
	 * @returns {void}
	 */
	const onKeyDown = (event) => {
		const { keyCode } = event;

		if (keyCode === ENTER) {
			if (filteredTimezones[activeTimezone]?.disabled) {
				return;
			}

			const foundTimezones = filterTimezones(filteredTimezones[activeTimezone].value);

			// Only override timezone label if timezone is updated.
			if (timezone !== filteredTimezones[activeTimezone].value) {
				setAttributes({ clockLabel: filteredTimezones[activeTimezone].value });
			}

			setAttributes({ timezone: filteredTimezones[activeTimezone].value });

			setActiveSuggestion(1);
			setShowSuggestions(false);
			setUserInput(filteredTimezones[activeTimezone].value);
			setFilteredTimezones(foundTimezones);
		} else if (keyCode === UP) {
			if (activeTimezone <= 1) {
				return;
			}

			setActiveSuggestion(activeTimezone - 1);

			if (
				typeof filteredTimezones[activeTimezone - 1] !== 'undefined' &&
				filteredTimezones[activeTimezone - 1]?.disabled
			) {
				setActiveSuggestion(activeTimezone - 2);
			}
		} else if (keyCode === DOWN) {
			if (activeTimezone + 1 === filteredTimezones.length) {
				return;
			}

			if (
				typeof filteredTimezones[activeTimezone + 1] !== 'undefined' &&
				filteredTimezones[activeTimezone + 1]?.disabled
			) {
				setActiveSuggestion(activeTimezone + 2);
			} else {
				setActiveSuggestion(activeTimezone + 1);
			}
		} else if (keyCode === ESCAPE) {
			setShowSuggestions(false);
			setUserInput(defaultUserInput);
		}
	};

	/**
	 * On focus event for the textbox.
	 */
	const onFocus = () => {
		setShowSuggestions(true);
	};

	/**
	 * On click event for the suggestion.
	 *
	 * @param {object} event Event for the suggestion for list.
	 *
	 * @returns {void}
	 */
	const onClick = (event) => {
		if (event.target.attributes?.disabled) {
			return;
		}

		const selectedTimezone = event.target.dataset.timezoneValue;
		const foundTimezones = filterTimezones(selectedTimezone);

		// Only override timezone label if timezone is updated.
		if (timezone !== selectedTimezone) {
			setAttributes({ clockLabel: selectedTimezone });
		}

		setAttributes({ timezone: selectedTimezone });

		setActiveSuggestion(1);
		setFilteredTimezones(foundTimezones);
		setUserInput(selectedTimezone);
		setShowSuggestions(false);
	};

	/**
	 * On change event for the timezone label field.
	 *
	 * @param {string} newClockLabel Textbox input string.
	 */
	const onChangeClockLabel = (newClockLabel) => {
		setAttributes({ clockLabel: newClockLabel });
	};

	let suggestionsList;
	if (showSuggestions) {
		if (filteredTimezones.length) {
			suggestionsList = (
				<ul className="timezone-suggestions">
					{filteredTimezones.map((timezoneObj, index) => {
						let className = 'timezone';

						// Flag the active timezone with a class
						if (index === activeTimezone) {
							className += ' timezone-active';
						}

						if (timezoneObj.value === defaultUserInput) {
							className += ' timezone-selected';
						}

						if (timezoneObj?.disabled) {
							className += ' timezone-disabled';
						}

						let clockLabelText = timezoneObj.label;
						if (timezoneObj.value === defaultUserInput) {
							clockLabelText += ` ${__('(Selected)', 'world-clocks')}`;
						}

						return (
							<li // eslint-disable-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
								className={className}
								key={timezoneObj.value}
								data-timezone-value={timezoneObj.value}
								onClick={onClick}
								disabled={timezoneObj?.disabled}
							>
								{clockLabelText}
							</li>
						);
					})}
				</ul>
			);
		} else {
			suggestionsList = (
				<div className="no-suggestions">
					<em>{__('Please select a valid timezone from the available list.')}</em>
				</div>
			);
		}
	}

	return (
		<PanelBody
			title={__('Timezone Settings', 'world-clocks')}
			className="single-clock-timezone-setting"
		>
			<TextControl
				className="single-clock-timezone-selector"
				label={__('Select Timezone', 'world-clocks')}
				value={userInput}
				onChange={onChange}
				onKeyDown={onKeyDown}
				onFocus={onFocus}
				onClick={onFocus}
				help={__(
					'Click on the textbox and start typing to find the suitable timezone. You can remove existing selected timezone and search more.',
					'world-clocks',
				)}
			/>

			<TextControl
				className="single-clock-timezone-label"
				label={__('Timezone Label', 'world-clocks')}
				value={clockLabel}
				onChange={onChangeClockLabel}
				help={__('Override default timezone label.', 'world-clocks')}
			/>

			{suggestionsList}
		</PanelBody>
	);
};

export default TimezoneSelector;
