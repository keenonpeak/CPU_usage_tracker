const http = require('http');
const server = http.createServer((req, res) => {
    if (req.url === '/'){
        res.write('Hello Leon');
        res.end();
    }
    if (req.url === '/api/leon'){
        res.write(JSON.stringify([0,9,0,2]));
        res.end();
    }
});
server.listen(3000);
console.log('Listening on port 3000...')