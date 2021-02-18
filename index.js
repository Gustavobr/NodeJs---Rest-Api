const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')
conexao.connect((error) => {
    if (error) {
        console.log(error.message)
        throw error;
    } else {
        Tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000, () => console.log('Servidor executando na porta 3000'))
        console.log('Conectado com sucesso')
    }
})