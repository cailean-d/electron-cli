const inquirer = require('inquirer');

module.exports = function(options) {
    console.log(`Creating ${options.mode} project...`);

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'project_type',
                message: 'Project type',
                default: 'Angular',
                choices: [
                    'Pure Js',
                    'Angular',
                    'Vue',
                ]
            },
            {
                type: 'input',
                name: 'project',
                message: 'Project name',
                default: 'Angular Sample',
            },
            {
                type: 'input',
                name: 'version',
                message: 'Project version',
                default: '1.0.0',
            },
            {
                type: 'input',
                name: 'entry',
                message: 'Entry point',
                default: 'main.js',
            },
            {
                type: 'input',
                name: 'author',
                message: 'Author',
            },
        ])
        .then(answers => {
            console.log(answers);

            if(answers.project_type === 'Angular') {
               inquirer
                .prompt([
                    {
                        type: 'confirm',
                        name: 'translate',
                        message: 'Add Ngx-Translate',
                    },
                    {
                        type: 'confirm',
                        name: 'routing',
                        message: 'Add routing module',
                        default: 'yes'
                    },
                    {
                        type: 'confirm',
                        name: 'skip_install',
                        message: 'Skip modules installing',
                        default: 'no'
                    },
                    {
                        type: 'list',
                        name: 'style',
                        message: 'Style',
                        default: 'scss',
                        choices: [
                            'css',
                            'sass',
                            'scss',
                            'less',
                            'stylus'
                        ]
                    },
                ])
                .then(answers => {
                    console.log(answers);
                });   
            }
        });
}