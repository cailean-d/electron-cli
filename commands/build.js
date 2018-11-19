const inquirer = require('inquirer');

module.exports = function() {
    inquirer
        .prompt([
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
        ])
        .then(answers => {
            console.log(answers);
        });
}