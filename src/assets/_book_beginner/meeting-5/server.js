let express = require('express');
let app = express();
app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});
app.get('/add', (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    console.log(number1);
    console.log(number2);
    res.send({result: number1 + number2});
});
app.get('/*.js', (req, res) => {
    res.sendFile(`${req.params[0]}.js`, {root: __dirname});
});
app.listen(8000, () => console.log('Listening on port 8000'));
