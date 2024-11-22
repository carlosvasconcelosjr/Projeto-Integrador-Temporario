const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const port = 3010;

const server = http.createServer((req, resp) => {
    const q = url.parse(req.url, true);
    const fileName = q.pathname === '/' ? 'html/index.html' : `.${q.pathname}`;

    // Verifica a extensão do arquivo para servir arquivos estáticos
    const extname = path.extname(fileName);

    // Tipos MIME para arquivos comuns
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Verifica se o arquivo requisitado existe
    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, (err, data) => {
            if (err) {
                resp.writeHead(500, { 'Content-Type': 'text/plain' });
                resp.write('Erro interno no servidor.');
                return resp.end();
            }
            resp.writeHead(200, { 'Content-Type': contentType });
            resp.write(data);
            return resp.end();
        });
    } else {
        // Retorna 404 se o arquivo não for encontrado
        fs.readFile('erro404.html', (err, data) => {
            resp.writeHead(404, { 'Content-Type': 'text/html' });
            resp.write(data || 'Página não encontrada.');
            return resp.end();
        });
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});
