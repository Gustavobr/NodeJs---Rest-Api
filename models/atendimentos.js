const conexao = require('../infraestrutura/conexao')
const moment = require('moment')
class Atendimento {

    listarAtendimentos(res) {
        const sql = "select * from agenda_petshop.atendimentos a"
        conexao.query(sql, (erro, results) => {
            if (erro) {
                res.status(400).json();
            } else {
                res.status(200).json(results);

            }
        })
    }
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY - MM - DD HH: MM: SS ')
        const atendimentoDatado = {...atendimento, dataCriacao, data }
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteValido = atendimento.client.length >= 4
        const validatorObject = [{
                nome: 'data',
                mensagem: 'data deve ser maior ou igual a data de criação',
                valido: dataValida
            },
            {
                nome: 'client',
                valido: clienteValido,
                mensagem: 'Nome do cliente deve conter 4 ou mais caracteres'
            }
        ]

        const erros = validatorObject.filter(campo => !campo.valido)
        const verificaErros = erros.length

        if (verificaErros) {
            res.status(400).json(erros)
        } else {
            const sql = 'INSERT INTO ATENDIMENTOS SET ?'

            conexao.query(sql, atendimento, (atendimentoDatado, error, results) => {
                if (error) {

                    res.status(400).json(error)

                } else {
                    res.status(201).json(results)
                    console.log(results);
                }
            })
        }
    }
    buscaPorId(id, res) {
        //string interpolada
        const sql = `SELECT * FROM ATENDIMENTOS A WHERE ID =${id}`
        try {
            conexao.query(sql, (erro, results, res) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json(resultados)
                }
            })
        } catch (error) {

        }
    }

    delete(id, valores, res) {
        if (req.params.id != null && valores.id != null) {
            const sql = "DELETE FROM ATENDIMENTOS WHERE ID =?"
            conexao.query(sql, [valores, id], (erro, results) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json(results)
                }
            })
        }
    }

    altera(id, valores, results) {
        /* `` interpolacao */
        if (valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY/MM/DD HH:MM:SS')
        }
        const sql = 'UPDATE ATENDIMENTOS SET ? WHERE ID = ?'
        conexao.query(sql, [valores, id], (erro, results) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(...valores, id)
            }
        })
    }

}




module.exports = new Atendimento