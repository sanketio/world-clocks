/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

const Line = () => {
	return (
		<SVG xmlns="http://www.w3.org/2000/svg" width="48" height="15" viewBox="0 0 48 15">
			<Path
				transform="rotate(90 27 0)"
				d="M30 0h9s3 0 3 3v0s0 3 -3 3h-9s-3 0 -3 -3v0s0 -3 3 -3"
			/>
			<Path
				transform="rotate(90 48 0)"
				d="M51 0h9s3 0 3 3v0s0 3 -3 3h-9s-3 0 -3 -3v0s0 -3 3 -3"
			/>
			<Path
				transform="rotate(90 6 0)"
				d="M9 0h9s3 0 3 3v0s0 3 -3 3h-9s-3 0 -3 -3v0s0 -3 3 -3"
			/>
		</SVG>
	);
};

export default Line;
