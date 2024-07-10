/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DigitalColumn from './icons/digital-column';
import DigitalRow from './icons/digital-row';
import Clock from './icons/clock';
import ClockReverse from './icons/clock-reverse';

/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: 'digital-row',
		title: __('Digital Row', 'world-clocks'),
		attributes: { layout: 'digital-row' },
		isDefault: true,
		innerBlocks: [['world-clocks/clock']],
		scope: ['block'],
		icon: DigitalRow,
	},
	{
		name: 'digital-column',
		title: __('Digital Column', 'world-clocks'),
		attributes: { layout: 'digital-column' },
		innerBlocks: [['world-clocks/clock']],
		scope: ['block'],
		icon: DigitalColumn,
	},
	{
		name: 'clock',
		title: __('Clock', 'world-clocks'),
		attributes: { layout: 'clock' },
		innerBlocks: [['world-clocks/clock']],
		scope: ['block'],
		icon: Clock,
	},
	{
		name: 'clock-reverse',
		title: __('Clock Reverse', 'world-clocks'),
		attributes: { layout: 'clock-reverse' },
		innerBlocks: [['world-clocks/clock']],
		scope: ['block'],
		icon: ClockReverse,
	},
];

export default variations;
