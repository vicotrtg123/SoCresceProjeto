const db = require('../config/db');

module.exports = {

    async ProcurarTodosOsInstrutores(req, res){
        try {
            let response = await db.query('SELECT numerocref, usuario.nome, usuario.email FROM instrutor INNER JOIN usuario ON instrutor.idusuario=instrutor.id');
            res.render('instrutores',{ instrutores: response[0]});
            
        } catch (error) {
            console.log(error);
        }
    }
}

