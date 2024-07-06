const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

module.exports = {
	...defaultConfig,
	output: {
		...defaultConfig.output,
		path: path.resolve(process.cwd(), 'dist'),
	},
	entry: {
		'clocks-block': ['./includes/blocks/clocks/index.js'],
		'clock-block': ['./includes/blocks/clock/index.js'],
		'admin-style': ['./assets/css/admin/admin-style.css'],
	},
};
