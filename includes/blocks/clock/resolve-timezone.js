/* global SPWPCLOCK */

/**
 * Resolve a stored timezone attribute to an IANA identifier.
 *
 * Blocks saved before 1.0.4 stored the translated display string rather than the identifier.
 *
 * @param {string} stored Timezone as stored on the block.
 *
 * @returns {string}
 */
export const resolveTimezone = (stored) => {
	if (!stored) {
		return 'UTC';
	}

	if (stored.toUpperCase().startsWith('UTC')) {
		return stored;
	}

	const selectable = SPWPCLOCK.timezones.filter((timezoneObj) => !timezoneObj?.disabled);

	if (selectable.some((timezoneObj) => timezoneObj.value === stored)) {
		return stored;
	}

	const legacy = selectable.find((timezoneObj) => timezoneObj.display === stored);

	return legacy ? legacy.value : stored.replace(/ /g, '_');
};

/**
 * Translated display string for an identifier, falling back to the identifier itself.
 *
 * @param {string} value IANA identifier.
 *
 * @returns {string}
 */
export const displayTimezone = (value) => {
	const match = SPWPCLOCK.timezones.find((timezoneObj) => timezoneObj.value === value);

	return match?.display || value;
};
