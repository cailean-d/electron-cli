module.exports = [
	{
		type: 'list',
		name: 'lang',
		message: 'Language: ',
		choices: [
			'TypeScript',
			'JavaScript',
		]
	},
	{
		type: 'list',
		name: 'style',
		message: 'Style: ',
		choices: [
				'CSS',
				'SCSS   [ http://sass-lang.com   ]',
				'SASS   [ http://sass-lang.com   ]',
				'LESS   [ http://lesscss.org     ]',
				'Stylus [ http://stylus-lang.com ]'
		]
	},
]