const fs = require('fs');
const exec = require('child_process').exec;
const { execSync } = require('child_process');


const validDirectories = ['tools'];

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

function updateRepo(name) {
    const stdout = execSync(`cd ${name} && git status --porcelain`);

    if (stdout.length !== 0) {
        console.log(`${name} has uncommited files. Must be clean to update.`);
        process.exit(1);
    }

    execSync(`cd ${name} && git checkout master && git pull`);
}

for (const directory of getDirectories('.')) {
    if (validDirectories.includes(directory)) {
        updateRepo(directory);
    }
}
