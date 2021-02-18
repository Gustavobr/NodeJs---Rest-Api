class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos()
        console.log('tabelas criadas')

    }


    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS ATENDIMENTOS (id INT NOT NULL AUTO_INCREMENT, cliente VARCHAR(50) NOT NULL,PET VARCHAR(20),servico varchar(20) NOT NULL, data datetime not null, dataCriacao datetime not null,  status varchar(20) not null, observacoes text, primary key(id))'
        this.conexao.query(sql, (error) => {
            if (error) {
                throw new Error('Erro ao montar schema de tabela');
            } else {
                console.log('Tabela de atendimentos criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas