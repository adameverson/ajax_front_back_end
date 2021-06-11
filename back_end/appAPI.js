const express = require("express");
const app = express();

app.use(express.json())

app.get('/projeto', (req, res) => {
    return res.json({ message: "Você acessou minha API (get)" });
});

app.post('/projeto', (req, res) => {
    try {
        res.status(201).send({ message: 'Você acessou minha API (post)'})
    } catch (err) {
        res.status(500).send({ Erro: 'Algo deu errado aqui'})
    }
});

app.listen(3333, () => {
    console.log("API rodando");
});