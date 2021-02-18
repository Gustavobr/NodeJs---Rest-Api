const Atendimento = require('../models/Atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listarAtendimentos(res)

    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body


        /* chama o Model  para efetuar busca na base de dados*/

        Atendimento.altera(id, valores, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.delete(id, valores, res)
        res.send(`Registro deletado com sucesso`)
    })

    app.get('/atendimentos/:id', (req, res) => {
        //console.log(req.params)
        const id = parseInt(req.params.id)
        Atendimento.buscaPorId(id)
        console.log(res.body.json())
        res.send('OK');

    })
    app.post('/atendimentos', (req, res) => {
        res.send('Voce está na rota de atendimentos e está realizando um POST')

        const atendimento = req.body

        Atendimento.adiciona(atendimento, res);
        // console.log(res)
    })
}