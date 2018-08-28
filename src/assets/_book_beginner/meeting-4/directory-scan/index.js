let fs = require('fs');
let dir = process.argv[2];
fs.readdir(dir, (err, files) => console.log(files.filter((file) => file.indexOf('.html') !== -1).join('\n')));
