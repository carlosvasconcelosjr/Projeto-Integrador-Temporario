const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const server = http.createServer((req, resp) => {
    const q = url.parse(req.url, true);
    const fileName = q.pathname === '/' ? 'html/index.html' : `html/${q.pathname.substring(1)}`;

    if (fileName.includes('index.html')) {
        if (fs.existsSync(fileName)) {
            fs.readFile(fileName, function (err, data) {
                if (err) {
                    resp.writeHead(500, { 'content-type': 'text/html' });
                    resp.write('Erro interno no servidor.');
                    return resp.end();
                }
                resp.writeHead(200, { 'content-type': 'text/html' });
                resp.write(data);
                return resp.end();
            });
        } else {
            fs.readFile('erro404.html', function (err, data) {
                resp.writeHead(404, { 'content-type': 'text/html' });
                resp.write(data || 'Página não encontrada.');
                return resp.end();
            });
        }
    } else {
        fs.readFile('erro404.html', function (err, data) {
            resp.writeHead(404, { 'content-type': 'text/html' });
            resp.write(data || 'Página não encontrada.');
            return resp.end();
        });
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});
