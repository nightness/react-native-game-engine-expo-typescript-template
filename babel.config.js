module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					root: ['./src'],
					extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.jsx', '.js', '.json'],
					alias: {
						'@entities': './game/entities',
						"@game": "./game",
						'@systems': './game/systems',
						'@svg': './assets/SVG',
						'@types': './game',
					},
				},
			],
		],
	};
};
