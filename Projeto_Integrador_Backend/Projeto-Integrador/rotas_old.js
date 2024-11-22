const http = require('http')

const fs = require('fs')

const url = require('url')

const port = 3000

const server = http.createServer((req, resp) => {
    const q = url.parse(req.url, true)
    const fileName = q.pathname.substring(1) // Qual é o fileName na url acessada, .pathname é a página que o usuário acessou
    // esse 1 é o segundo parâmetro da url, 0 é o principal, ou seja, é o index.html

    if (fileName.includes('index.html')) {
        if (fs.existsSync(fileName)) { // Verifica se o arquivo existe, o sistema espera a verificação e somente depois 
            //continua sua operação
            fs.readFile(fileName, function (err, data) {
                resp.writeHead(200, { 'content-type': 'text/html' })
                resp.write(data)
                return resp.end()
            })
        } else {
            // 404
            fs.readFile('erro404.html', function (err, data) {
                resp.writeHead(404, { 'content-type': 'text/html' })
                resp.write(data)
                return resp.end()
            })
        }
    } else {

    }
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});