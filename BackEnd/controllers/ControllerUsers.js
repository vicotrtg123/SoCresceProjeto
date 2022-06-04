const db = require('../config/db');

module.exports = {

    async mostrarInstrutores (req, res) {
        let response = await db.query('SELECT * FROM instrutor');
        res.json(response);
    },  

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
    async login (req, res) {
        res.render('login');
    },

    async erro (req, res) {
        res.render('erro');
    },

    async home (req, res) {
        res.render('home');
    },

    async telaTreinos (req, res) {
        res.render('telaTreinos');
    },

    async cadastrarNovoTreino (req, res) {
        res.render('cadastrarNovoTreino');
    },

    async cadastro (req, res) {
        res.render('cadastro');
    },

    async ProcurarTodosOsUsuarios(req, res){
        try {
            let response = await db.query('SELECT * FROM usuario');
            
        } catch (error) {
            console.log(error);
        }
    },

    async ProcurarUsuarioPorEmailSenha(req, res){
        let senha = req.body.senha;
        let email = req.body.email;
        
        try {
            let response = await db.query('SELECT id FROM usuario WHERE senha = ? AND email = ?', [senha, email]);   
            if (response[0] == '') {
                res.redirect('/erro');       
            } else {
                idUsuarioLogado = response[0][0]["id"];
                res.redirect('/home');
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
    },

    async logar(req,res){

        const user = await User.findOne({
            attributes: ['id', 'name', 'senha'],
            where:{
                email: req.body.email
            }
        })
    
        if (user === null){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro"
            });
        }
    
        if (!(await req.body.senha == user.senha)){
            return res.status(400).json({
                erro: true,
                mensagem: "Erro para logar"
            });   
        }
    
        var token = jwt.sign({id: 1}, "wdawdwda", {
            expireIn: '7d'
        });
    
        return res.json({
            erro: false,
            mensagem: "Logou",
            token
        })
    }
}