/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

const Clock = () => {
	return (
		<SVG width="58" height="38" viewBox="0 0 58 38" xmlns="http://www.w3.org/2000/svg">
			<Path d="M0 12.5a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0" />
			<Path d="M33 12.5a12.5 12.5 0 1 0 25 0a12.5 12.5 0 1 0 -25 0" />
			<Path d="M8 29h9s1 0 1 1v0s0 1 -1 1h-9s-1 0 -1 -1v0s0 -1 1 -1" />
			<Path d="M41 29h9s1 0 1 1v0s0 1 -1 1h-9s-1 0 -1 -1v0s0 -1 1 -1" />
			<Path d="M7.5 33h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5" />
			<Path d="M40.5 33h10s2.5 0 2.5 2.5v0s0 2.5 -2.5 2.5h-10s-2.5 0 -2.5 -2.5v0s0 -2.5 2.5 -2.5" />
		</SVG>
	);
};

export default Clock;
