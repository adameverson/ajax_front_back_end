var bodyParser = require('body-parser');
const fs = require('fs').promises;
const express = require("express");
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    fs.readFile("C:/Users/Qualidade/Documents/repgittestes/ajax_front_back_end/front_end/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            res.writeHead(500);
            res.end(err);
            return;
        });
});

app.get('/api', async (req, res) => {
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        const resultado = await cliente.query("select * from carros") // executa a query SQL
        console.table(resultado.rows) // Lista as tabelas no terminal

        //var dados = selectDados();
        var strJson = "{ \"dados\": [";
        for(let i = 0; i < resultado.rows.length; i++){
            if(i == 0){
                strJson += "{ \"message\": \"" + resultado.rows[i].marca + "\" }"
            } else {
                strJson += ",{ \"message\": \"" + resultado.rows[i].marca + "\" }"
            }
        }
        strJson += "] }";

        //return res.json("{ \"message\": \"" + resultado.rows.length + "\" }");
        res.status(200).send(strJson);
    }
    catch (ex){
        console.log("Ocorreu erro no selectDados. Erro: " + ex)
    }
});

app.post('/api', (req, res) => {
    try {
        insertDados(req.body.marca);
        res.status(201).send("{ \"message\": \"Você acessou minha API (post)\" }");
    } catch (err) {
        res.status(500).send({ Erro: 'Algo deu errado aqui'});
    }
});

app.delete('/api', (req, res) => {
    try {
        deleteDados(req.body.id);
        res.status(200).send("{ \"message\": \"Você acessou minha API (delete)\" }");
    } catch (err) {
        res.status(500).send({ Erro: 'Algo deu errado aqui'});
    }
});

app.put('/api', (req, res) => {
    try {
        updateDados(req.body.id,req.body.marca);
        res.status(200).send("{ \"message\": \"Você acessou minha API (put)\" }");
    } catch (err) {
        res.status(500).send({ Erro: 'Algo deu errado aqui'});
    }
});

app.listen(8081, function(){
    console.log("Servidor rodando");
})

// Pool(mais rapido mas com algumas restrições) or Client
const Pool = require('pg').Pool
const cliente = new Pool({
    user: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "usuarios2"
})

//----------- Maneira mais simples de criar uma conexão com o banco --------------
/* cliente.connect() //abrir uma conexão com o banco
cliente.query("select * from usuarios") //executar a query SQL
.then(results => { //jogar o resultado da query no results
    const resultado = results.rows //jogar as linhas do resultado na constante resultado
    console.table(resultado) //exibir o resultado no console.*
})
.finally(() => cliente.end()) // fecha a conexão */

//selectDados()
//insertDados("TesteNovo5")
//deleteDados(1)
//updateDados(3, "TesteAntigo4")

async function selectDados(){ // função assyncrona de recuperar dados da tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        const resultado = await cliente.query("select * from carros") // executa a query SQL
        console.table(resultado.rows) // Lista as tabelas no terminal

        return resultado.rows;
    }
    catch (ex){
        console.log("Ocorreu erro no selectDados. Erro: " + ex)
    }
}

async function insertDados(nome){ // função assyncrona de inserir dados na tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        await cliente.query('insert into carros("marca") values (' + "'" + nome + "');")
        console.log("Valor inserido na tabela")
        
        const resultado = await cliente.query("select * from carros")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("Ocorreu erro no insertDados. Erro: " + ex)
    }
}

async function deleteDados(id){ // função assyncrona de remover dados da tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        await cliente.query("delete from carros where id = " + id + ";")
        console.log("Valor removido da tabela")
        
        const resultado = await cliente.query("select * from carros")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("Ocorreu erro no deleteDados. Erro: " + ex)
    }
}

async function updateDados(id, nome){ // função assyncrona de alterar dados da tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        await cliente.query("update carros set marca = '" + nome + "' where id = " + id + ";")
        console.log("Valor alterado da tabela")
        
        const resultado = await cliente.query("select * from carros")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("Ocorreu erro no updateDados. Erro: " + ex)
    }
}

/* const http = require("http");
const fs = require('fs').promises;

const _dirname = "C:/Users/Qualidade/Documents/repgittestes/ajax_front_back_end/front_end"

http.createServer((req,res) => {
    if(req.url === "/"){
        fs.readFile(_dirname + "/index.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
    } else if(req.url === "/get"){
        
    }
}).listen(8081)

console.log("Servidor rodando"); */