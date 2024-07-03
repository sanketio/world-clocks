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
		name: 'digital-column',
		title: __('Digital Column', 'wp-clocks'),
		attributes: { layout: 'digital-column' },
		isDefault: true,
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
		isActive: (blockAttributes) =>
			!blockAttributes.layout || blockAttributes.layout === 'digital-column',
		icon: DigitalColumn,
	},
	{
		name: 'digital-row',
		title: __('Digital Row', 'wp-clocks'),
		attributes: { layout: 'digital-row' },
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
		isActive: (blockAttributes) => blockAttributes.layout === 'digital-row',
		icon: DigitalRow,
	},
	{
		name: 'clock',
		title: __('Clock', 'wp-clocks'),
		attributes: { layout: 'clock' },
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
		isActive: (blockAttributes) => blockAttributes.layout === 'clock',
		icon: Clock,
	},
	{
		name: 'clock-reverse',
		title: __('Clock Reverse', 'wp-clocks'),
		attributes: { layout: 'clock-reverse' },
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
		isActive: (blockAttributes) => blockAttributes.layout === 'clock-reverse',
		icon: ClockReverse,
	},
];

export default variations;
