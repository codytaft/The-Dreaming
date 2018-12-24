let express = require('express');
let app = express();
let path = require('path');

app.use(express.static('public'));
// app.use(express.static(__dirname + '/Scripts'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(3000, () => {
  console.log('Express Server now running on port 3000');
});