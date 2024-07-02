/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Template option choices for predefined columns layouts.
 */
const variations = [
	{
		name: 'digital-column',
		title: __('Digital Column', 'wp-clocks'),
		icon: (
			<SVG
				width="58"
				height="19"
				viewBox="0 0 58 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fill="#007cba"
					d="M7.5 16h10s1.5 0 1.5 1.5v0s0 1.5 -1.5 1.5h-10s-1.5 0 -1.5 -1.5v0s0 -1.5 1.5 -1.5"
				/>
				<Path
					fill="#007cba"
					d="M40.5 16h10s1.5 0 1.5 1.5v0s0 1.5 -1.5 1.5h-10s-1.5 0 -1.5 -1.5v0s0 -1.5 1.5 -1.5"
				/>
				<Path fill="#007cba" d="M6 0h13s6 0 6 6v0s0 6 -6 6h-13s-6 0 -6 -6v0s0 -6 6 -6" />
				<Path fill="#007cba" d="M39 0h13s6 0 6 6v0s0 6 -6 6h-13s-6 0 -6 -6v0s0 -6 6 -6" />
			</SVG>
		),
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
	},
	{
		name: 'digital-row',
		title: __('Digital Row', 'wp-clocks'),
		icon: (
			<SVG
				width="60"
				height="31"
				viewBox="0 0 60 31"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fill="#007cba"
					d="M46.5 0h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M46.5 13h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M46.5 26h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M3.5 0h30s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-30s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M3.5 13h30s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-30s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M3.5 26h30s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-30s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path d="M1 9H59" stroke="#007cba" stroke-linecap="round" />
				<Path d="M1 22H59" stroke="#007cba" stroke-linecap="round" />
			</SVG>
		),
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
	},
	{
		name: 'clock',
		title: __('Clock', 'wp-clocks'),
		icon: (
			<SVG
				width="58"
				height="38"
				viewBox="0 0 58 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path fill="#007cba" d="M0 12.5a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0" />
				<Path fill="#007cba" d="M33 12.5a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0" />
				<Path fill="#007cba" d="M8 29h9s1 0 1 1v0s0 1 -1 1h-9s-1 0 -1 -1v0s0 -1 1 -1" />
				<Path fill="#007cba" d="M41 29h9s1 0 1 1v0s0 1 -1 1h-9s-1 0 -1 -1v0s0 -1 1 -1" />
				<Path
					fill="#007cba"
					d="M7.5 33h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M40.5 33h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
			</SVG>
		),
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
	},
	{
		name: 'clock-reverse',
		title: __('Clock Reverse', 'wp-clocks'),
		icon: (
			<SVG
				width="58"
				height="38"
				viewBox="0 0 58 38"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path fill="#007cba" d="M0 25.5a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0" />
				<Path fill="#007cba" d="M33 25.5a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0" />
				<Path fill="#007cba" d="M8 0h9s1 0 1 1v0s0 1 -1 1h-9s-1 0 -1 -1v0s0 -1 1 -1" />
				<Path fill="#007cba" d="M41 0h9s1 0 1 1v0s0 1 -1 1h-9s-1 0 -1 -1v0s0 -1 1 -1" />
				<Path
					fill="#007cba"
					d="M7.5 4h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
				<Path
					fill="#007cba"
					d="M40.5 4h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5"
				/>
			</SVG>
		),
		innerBlocks: [['wp-clocks/clock']],
		scope: ['block'],
	},
];

export default variations;
