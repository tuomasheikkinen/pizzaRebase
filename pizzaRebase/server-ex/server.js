const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', 3000);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
});

app.get('/', function (req, res) {
    res.send('This is the frontpage');
    console.log('"frontpage"')
})
app.post('/login', function (req, res) {
    console.log("Got a POST request from the login form");
    console.log("Responding with:")
    console.log(req.body)
    res.send(createResponseText(req.body, 'Login form'));
});

app.post('/pizza-form', function (req, res) {
    console.log("Got a POST request from the pizza form");
    console.log("Responding with:")
    console.log(req.body)
    res.send(createResponseText(req.body, 'Pizza order form'));
});
app.post('/*', function (req, res) {
    console.log("Got a post request for a path that doesn't match spesifications. Read the instructions! ");
    console.log("Responding with:")
    console.log("READ THE MANUAL! USING INCORRECT PATH!")
    res.send('<h1>READ THE MANUAL! USING INCORRECT PATH</h1>');
});

app.listen(app.get('port'), () => {
    console.log('Palvelin on päällä');
    console.log('Paina CTRL-C lopettaaksesi! \n');
});
function getKeys(object) {
    let keyArray = Object.keys(object)
    return keyArray.map(x => `<td>${x}</td>`)
}
function getValues(object) {
    let valueArray = Object.values(object)
    return valueArray.map(x => `<td>${x}</td>`)
}
function combineKeysValues(keys, values) {
    let text = ' '
    for (let i = 0; i <= keys.length-1; i++) {
        text = text + '<tr>' + keys[i] + values[i] + '</tr>'
    }
    return text;
}
function createResponseText(object, title) {
    return `<!DOCTYPE html>
<head>
    <style>
        table,tr,th,td{border:1px solid black}
    </style>
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
</head>
<body>
    <h1>${title}</h1>
    <table>
        <tr>
            <th>Keys</th>
            <th>Values</th>
        </tr>
        ${combineKeysValues(getKeys(object), getValues(object))}
    </table>
</body>`

}
module.exports = app;