const { set } = require("../../config/custom-express");

class LivroDao{
    constructor(db){
        this._db = db;
    }

    lista(){

        return new Promise((resolve,reject) => {
            this._db.all('SELECT * from livros', (erro,resultados) => {
                if (erro) return reject("Não foi possível listar os livros!");

                return resolve(resultados);
            })
        })

        this._db.all('SELECT * FROM livros', (erro,resultados) => callback(erro,resultados));
    }

    adiciona(livro){
        return new Promise((resolve,reject) => {
            this._db.run(
                `INSERT INTO livros (
                    titulo,
                    preco,
                    descricao) 
                VALUES 
                    (?,?,?)
                `,[
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (erro, resultados) => {
                    if(erro) reject('Não foi possível inserir os dados na tabela.');

                    resolve();
                }
            );
        })
    }

    buscaPorId(id){
        return new Promise((resolve,reject) => {
            this._db.get(
                'SELECT * FROM livros WHERE id = ?'
                ,[id],
                (erro,resultado) => {
                    if(erro) reject('Erro ao buscar tal livro');

                    resolve(resultado);
                });
        })
    }

    atualiza(livro){
        return new Promise((resolve,reject) => {
            console.log(livro,"--");
            this._db.run(
                'UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ?'
                ,[
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (erro,resultdo) => {
                    if(erro) reject('Não foi possível atualizar o livro');

                    resolve();
                }
            )
        });
    }

    remove(id){
        return new Promise((resolve,reject) => {
            this._db.run('DELETE FROM livros WHERE id = ?',
            [id],
            (erro) => {
                if(erro) reject('Não foi possível deletar o livro');

                resolve();
            });
        })
    }
}

module.exports = LivroDao;