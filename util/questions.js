const fs = require('fs');
const path = require('path');

exports.project = [
	{
		type: 'list',
		name: 'project_type',
		message: 'Project framework: ',
		choices: [
				'Pure JS',
				'Angular',
				'Vue',
		]
	},
  {
    type: 'input',
    name: 'project_name',
    message: 'Project name: ',
		default: 'new-project',
		validate: function(input) {
			let directory = path.join(process.cwd(), input);
			if (fs.existsSync(directory)) return false;
			return /^[\w-_\\.]+$/.test(input);
		}
  },
  {
      type: 'input',
      name: 'version',
      message: 'Project version: ',
			default: '0.1.0',
			validate: function(input) {
				return /^\d+\.\d+\.\d+$/.test(input);
			}
	},
	{
		type: 'input',
		name: 'author',
		message: 'Author: ',
	},
	{
		type: 'input',
		name: 'description',
		message: 'Description: ',
	},
	{
		type: 'input',
		name: 'license',
		message: 'License: ',
		default: 'MIT'
	},
	{
		type: 'input',
		name: 'git',
		message: 'Git repository: ',
	},
	{
		type: 'input',
		name: 'keywords',
		message: 'Keywords: ',
		validate: function(input) {
			return /($^)|(^[a-zA-Z0-9_]+( [a-zA-Z0-9_]+)*$)/.test(input);
		}
	},
	{
		type: 'confirm',
		name: 'license_file',
		message: 'Add license file: ',
		default: true
	},
	{
		type: 'confirm',
		name: 'skip_install',
		message: 'Skip modules installing: ',
		default: false
	},
];

exports.electron = [
	{
		type: 'confirm',
		name: 'default_menu',
		message: 'Add default menu: ',
		default: true
	},
	{
		type: 'confirm',
		name: 'license_file',
		message: 'Open devTools in development mode: ',
		default: true
	},
]

exports.angular = [
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

exports.vue = [

]

exports.purejs = [
	{
		type: 'list',
		name: 'lang',
		message: 'Language: ',
		choices: [
				'JavaScript',
				'TypeScript',
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

exports.build = [
	{
		type: 'list',
		name: 'os',
		message: 'Choose OS type',
		default: 'windows',
		choices: [
				'windows',
				'linux',
				'macos',
		]
	},
]