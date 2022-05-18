const db = require('../config/db');

module.exports = {
    async insert(req, res){
        let datas = {
            "nome": req.body.nome,
            "cpf": req.body.cpf,
            "email": req.body.email,
            "senha": req.body.senha
        }

        try {
            let response = await db.query('INSERT INTO usuario SET ?', [datas]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async update(req, res){
        let id = req.params.id;

        let datas = {
            "nome": req.body.nome,
            "email": req.body.email,
            "senha": req.body.senha
        }

        try {
            let response = await db.query('UPDATE usuario SET ? WHERE id = ?', [datas, id]);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    },
    async ProcurarTodosOsUsuarios(req, res){
        try {
            let response = await db.query('SELECT * FROM usuario');
            res.json(response[0]);
        } catch (error) {
            console.log(error);
        }
    },
    async ProcurarUsuarioPorEmailSenha(req, res){
        let senha = req.query.senha;
        let email = req.query.email;
        try {
            let response = await db.query('SELECT * FROM usuario WHERE senha = ? AND email = ?', [senha, email]);
            if (response[0] == ''){
                res.sendFile('C:/Users/Victor/Desktop/SoCresceProjeto/Front/Erro.html') 
            }else{
                res.sendFile('C:/Users/Victor/Desktop/SoCresceProjeto/Front/telamenu.html');

            }

        } catch (error) {
            console.log(error);
        }
    },
    async delete(req, res){
        let id = req.params.id;

        try {
            let response = await db.query(`DELETE FROM usuario WHERE id = ${id}`);
            res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
}