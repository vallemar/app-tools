import { execSync } from 'child_process';
const args = process.argv;
execSync(`./node_modules/.bin/set-version ${args[3]} ${args[4]}`, { stdio: 'inherit' });
execSync(`git add *.plist *app.gradle`, { stdio: 'inherit' });
execSync(`git commit -m "chore(${args[3]}): build version upgrade"`, { stdio: 'inherit' });
