const {Command} = require('commander');
const fs = require('fs');

const program = new Command();

program.command('count')
.description('Count the number of words in your file.')
.argument('<filepath>', 'file to process number of words')
.action((filePath) => {
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if(!err) {
            const words = content.split(' ').length;
            console.log(`You have ${words} words in the file`);
        }else{
            console.log('Error reading file!');
        }
    })
})

program.parse();

