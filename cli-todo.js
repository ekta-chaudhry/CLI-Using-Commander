const fs = require('fs');
const {Command} = require('commander');

const program = new Command();

program
.name('A CLI based To-Do Application')
.description('Adding features of a to-do app in cli')

program.command('list')
.action(() => {
    fs.readFile('todos.json', 'utf-8', (err, content) => {
        if(!err) {
            if(content) {
                convertedData = JSON.parse(content);
                for (const todo of convertedData) {
                    console.log('Name: ', todo.name, ' Status: ', todo.status);
                }
            }
        }
    })
})
program
.command('add')
.argument('<To-Do Name>')
.action((todoName) => {
    fs.readFile('todos.json', 'utf-8', (err, content) => {
        if(!err) {
            let convertedData = [];
            if(content) {
                convertedData = JSON.parse(content);
                for (const todo of convertedData) {
                    if(todo.name === todoName) {
                        console.log('To-Do already exists!');
                        return;
                    }
                }
            }
            convertedData.push({name: todoName, status: 'Incomplete'});
            fs.writeFile('todos.json', JSON.stringify(convertedData), (err) => {
                if(!err) {
                    console.log('Added new todo: ', todoName);
                }
            })
        }
    })
})

program.command('delete')
.argument('<To-Do Name>')
.action((todoName) => {
    fs.readFile('todos.json', 'utf-8', (err, content) => {
        if(content) {
            let convertedData = [];
            convertedData = JSON.parse(content);
            const initialLength = convertedData.length;
            convertedData = convertedData.filter((todo => todo.name !== todoName));
            if(convertedData.length === initialLength) {
                console.log('No such to-do exists!');
                return;
            }
            fs.writeFile('todos.json', JSON.stringify(convertedData), (err) => {
                if(!err) {
                    console.log('To-do deleted successfully!');
                }
            })
        }
    })
})

program
.command('mark-done')
.argument('<To-Do Name>')
.action((todoName) => {
    fs.readFile('todos.json', 'utf-8', (err, content) => {
        if(!err) {
            if(!content) {
                return;
            }
            else {
                let convertedData = [];
                convertedData = JSON.parse(content);
                let i = 0;
                for (i; i < convertedData.length; i++) {
                    if(convertedData[i].name === todoName) {
                        if(convertedData[i].status === 'Complete') {
                            console.log('To-Do is already marked as done!');
                            return;
                        }
                        convertedData[i].status = 'Complete';
                        break;
                    }
                }
                if(i === convertedData.length) {
                    console.log('No to-do with the given name exists!');
                    return;
                }
                fs.writeFile('todos.json', JSON.stringify(convertedData), (err) => {
                    if(!err) {
                        console.log('Marked the to-do as complete!');
                    }
                })
            }
        }
    })
})
program.parse();