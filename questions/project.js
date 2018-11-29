const fs = require('fs');
const path = require('path');

module.exports = [
	{
		type: 'list',
		name: 'project_type',
		message: 'Project framework: ',
		choices: [
				'No framework',
				'Angular',
				'Vue',
				'React'
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
		type: 'list',
		name: 'license',
		message: 'License: ',
		choices: [
			'ISC',
			'MIT',
			'CC0_1.0',
		]
	},
	{
		type: 'confirm',
		name: 'license_file',
		message: 'Add license file: ',
		default: true
	},
	{
		type: 'input',
		name: 'email',
		message: 'Email: ',
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
		name: 'skip_install',
		message: 'Skip module installing: ',
		default: false
	},
];