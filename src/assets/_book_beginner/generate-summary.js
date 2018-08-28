/*
 * SUMMARY GENERATOR
 * USAGE: `node generate-summary.js {directory-name}`
 */
let md = require('markdown').markdown;
let fs = require('fs');
let _ = require('lodash');
let dir = process.argv[2];

/**
 * Gets header titles as an array
 * @param  {Object[]} treeArray
 * @param  {number} headerLevel
 * @return {Object[]}
 */
function getHeaders(treeArray, headerLevel) { // header level is size of header
    return _.chain(treeArray)
        .filter((value) => value[1].level === headerLevel)
        .value();
}

/**
 * Generates root SUMMARY.md file
 */
function generateRootSummary() {
    let content = [];
    let files = fs.readdirSync(__dirname);
    let filteredFiles = files.filter((file) => file.indexOf('meeting-') !== -1);
    filteredFiles.forEach((folder) => {
        let file = fs.readFileSync(folder + '/SUMMARY.md', 'utf8');
        let tree = md.parse(file);
        let level1 = getHeaders(tree, 1);
        let files = fs.readdirSync(folder);
        content.push(`* [Meeting ${folder.substr(8)}](${folder + '/SUMMARY.md'})`);
        let filteredFiles = files.filter((file) => file.indexOf('.md') !== -1);
        level1.forEach((value, index) => {
            content.push(`    * [${value[2]}](${folder + '/' + filteredFiles[index]})`);
        });
    });
    fs.writeFileSync(__dirname + '/SUMMARY.md', content.join('\n') + '\n');
}
/**
 * Generates summary given directory
 * @param  {string} directory
 */
function generateSummary(directory) {
    let files = fs.readdirSync(directory);
    let content = [];
    let filteredFiles = files.filter((file) => file.indexOf('SUMMARY.md') === -1 && file.indexOf('.md') !== -1);
    filteredFiles.forEach((currentFile) => {
        let file = fs.readFileSync(directory + '/' + currentFile, 'utf8');
        let tree = md.parse(file);
        level1 = getHeaders(tree, 1);
        level2 = getHeaders(tree, 2);
        let arr = '';
        level2.forEach((value) => arr += '* ' + value[2] + '\n');
        content.push('# ' + level1[0][2] + '\n' + arr);
    });
    fs.writeFileSync(directory + '/SUMMARY.md', content.join('\n'), (err) => err && console.log(err));
}

if (process.argv.length < 3 || process.argv[2] === '.') {
    generateRootSummary();
} else if (process.argv[2] === '-a') {
    let filteredFiles = fs.readdirSync('.').filter((file) => file.indexOf('meeting-') !== -1);
    filteredFiles.forEach((folderName) => {
        generateSummary(folderName);
    });
    generateRootSummary();
} else {
    generateSummary(dir);
}
