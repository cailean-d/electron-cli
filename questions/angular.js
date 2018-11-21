module.exports = [
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
	{
		type: 'confirm',
		name: 'routing',
		message: 'Add routing module: ',
		default: true
	},
	{
		type: 'confirm',
		name: 'translate',
		message: 'Add Ngx-Translate: ',
		default: true
	},
	{
		type: 'confirm',
		name: 'provider',
		message: 'Add electron provider: ',
		default: true
	},
]