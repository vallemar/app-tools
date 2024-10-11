const fs = require('fs');
const crypto = require('crypto');

const changes = {
    devDependencies: {},
    scripts: {},
    ntl: {}
};

const pluginPackageJSON = JSON.parse(fs.readFileSync('./package.json'));

function checkAndUpdate(json, field) {
    if (typeof json === 'object' && !Array.isArray(json)) {
        if (pluginPackageJSON[field] === undefined) {
            pluginPackageJSON[field] = {};
        }
        for (const [key, value] of Object.entries(json)) {
            if (typeof pluginPackageJSON[field][key] === 'undefined') {
                pluginPackageJSON[field][key] = value;
            } else if (JSON.stringify(value) !== JSON.stringify(pluginPackageJSON[field][key])) {
                if (typeof value === 'object') {
                    pluginPackageJSON[field] = {};
                    pluginPackageJSON[field][key] = value;
                } else {
                    pluginPackageJSON[field][key] = value;
                }
            }
        }
    } else {
        pluginPackageJSON[field] = json;
    }
}

function deleteProperty(obj, match) {
    delete obj[match];
    for (const v of Object.values(obj)) {
        if (v instanceof Object) {
            deleteProperty(v, match);
        }
    }
}

function compareFile(file1, file2) {
    const file1Content = fs.readFileSync(file1);
    const file2Content = fs.readFileSync(file2);

    const hash1 = crypto.createHash('md5').update(file1Content).digest('hex');
    const hash2 = crypto.createHash('md5').update(file2Content).digest('hex');

    return hash1 === hash2;
}

function handleCommonFile(file, directory) {
    const destFile = `./${directory}${file}`;
    const inFile = `./tools/common/${directory}${file}`;
    if (fs.lstatSync(inFile).isDirectory()) {
        fs.readdirSync(inFile).forEach(file2=>handleCommonFile(file2, file + '/'));
    } else {
        if (!fs.existsSync(destFile)) {
            console.log(`Copying common file over: ${inFile}}`);
            fs.copyFileSync(inFile, destFile);
        } else if (!compareFile(destFile, inFile)) {
            console.log(`File: ${inFile} is different from common version.`);
            fs.copyFileSync(inFile, destFile);
        }
    }
}

fs.readdirSync('./tools/common').forEach(file=>handleCommonFile(file, ''));

const commonPackageJSON = JSON.parse(fs.readFileSync('./tools/package.json.template'));
checkAndUpdate(commonPackageJSON['scripts'], 'scripts');

fs.writeFileSync('./package.json', JSON.stringify(pluginPackageJSON, 0, 4) + '\n');
console.log('Common files and package.json have been synced.');
