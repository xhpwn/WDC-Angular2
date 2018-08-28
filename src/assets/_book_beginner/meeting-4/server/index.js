let express = require('express');
let app = express();
app.get('/', (req, res) => res.send('hello world'));
app.get('/*', (req, res) => res.sendFile(req.params[0], {root: 'dist'}));
app.listen(8000, () => console.log('Running on port 8000'));
