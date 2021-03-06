exports.basic = [
	{
		type: 'confirm',
		name: 'run_project',
		message: 'Run project in development mode: ',
		default: true
	},
  {
		type: 'confirm',
		name: 'run_vscode',
		message: 'Open project in VS Code: ',
		default: true
	},
]

exports.vscode = [
	{
		type: 'list',
		name: 'vscode_mode',
		message: 'Open in current or new window: ',
		choices: [
			'New window',
			'Current window',
		]
	},
]
