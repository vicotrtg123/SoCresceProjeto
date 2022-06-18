const db = require('../config/db');

module.exports = {

    async ProcurarTodosOsInstrutores(req, res){
        try {
            let response = await db.query('SELECT i.numerocref, u.nome, u.email FROM instrutor i INNER JOIN usuario u ON i.idusuario = u.id');
            console.log(response[0])
            res.render('instrutores',{ instrutores: response[0]});
            
        } catch (error) {
            console.log(error);
        }
    }
}

