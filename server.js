const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write('File not Found!');
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(3003);
