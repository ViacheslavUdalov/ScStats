const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const  server = http.createServer((req, res) => {
    console.log('Server request');
    res.setHeader('Content-Type', 'text/html');
    const createPath = (page) => path.resolve(__dirname, `${page}.html`);
  let basePath = '';
  switch (req.url) {
      case '/':
          basePath = createPath('main');
          res.statusCode = 200;
          break;
      case '/notindex':
          res.statusCode = 301;
          res.setHeader('Location', '/index');
          res.end();
          break;
      case '/index':
          basePath = createPath('index');
          res.statusCode = 200;
          break;
      default:
          basePath = createPath('error');
          res.statusCode = 404;
          break;
  }
       fs.readFile(basePath, (err, data) => {
           if (err) {
               console.log(err);
               res.statusCode = 500;
               res.end()
           }
           else {
               res.write(data);
               res.end()
           }
       })
});
