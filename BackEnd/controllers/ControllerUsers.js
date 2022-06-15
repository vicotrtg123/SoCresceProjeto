const db = require('../config/db');
var idUsuarioLogado = 0;

module.exports = {

    //renderizacao de telas
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
        let response = await db.query('SELECT t.id, t.descricao, t.nome FROM treino t INNER JOIN alunotreinos a ON t.id = a.idtreino WHERE a.idaluno = ?', idUsuarioLogado);
        res.render('telatreinos',{ treinos: response[0]});
    },

    async cadastrarNovoTreino (req, res) {
       
        try {
            let responseS = await db.query('SELECT * FROM exercicio WHERE tipo = "S"');
            let responseB = await db.query('SELECT * FROM exercicio WHERE tipo = "B"');
            let responseP = await db.query('SELECT * FROM exercicio WHERE tipo = "P"');

            res.render('cadastrarNovoTreino',{ supino: responseS[0],  biceps: responseB[0], perna: responseP[0]}); 
        } catch (error) {
            console.log(error);
        }

        res.render('cadastrarNovoTreino');
    },

    async cadastro (req, res) {
        res.render('cadastro');
    },

    //funcoes banco
    async mostrarInstrutores (req, res) {
        let response = await db.query('SELECT * FROM instrutor');
        res.json(response);
    },  

    async insert(req, res){
        let datas1 = {
            "nome": req.body.nome,
            "cpf": req.body.cpf,
            "email": req.body.email,
            "senha": req.body.senha,
        }

        try {
            let response = await db.query('INSERT INTO usuario SET ?', [datas1]);
            let idUsuario = await db.query('SELECT MAX(id) AS id FROM usuario'); 

            if (!req.body.checkboxCadastro) { 
                let dadosAluno = {
                    "idusuario": idUsuario[0][0]["id"],
                    "limitacoes": req.body.limitacoes
                }

                let aluno = await db.query('INSERT INTO aluno SET ?', [dadosAluno]);    
            } else {
                let dadosInstrutor = {
                    "idusuario": idUsuario[0][0]["id"],
                    "numerocref": req.body.cref
                }

                let instrutor = await db.query('INSERT INTO instrutor SET ?', [dadosInstrutor]);
            }

            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    },

    async confirmacaoTreino(req, res){
        res.render('confirmacaoTreino');
    },

    async resultadoTreino(req, res){
        let checkboxTreino = req.body.checkboxTreino
        let response = await db.query('SELECT * FROM exercicio p WHERE p.id IN(?)', [checkboxTreino]);
        res.render('confirmacaoTreino',{ treinos: response[0]});
    },

    async resultadoFinalTreino(req, res){
        let exercicios = req.body.exercicio

        let dadosTreino = {
            "nome": req.body.nome,
            "descricao": req.body.descricao
        }

        let response = await db.query('INSERT INTO treino SET ?', [dadosTreino])
        let idTreino = await db.query('SELECT MAX(id) AS id FROM treino')

        let alunoTreino = {
            "idaluno": idUsuarioLogado,
            "idtreino": idTreino[0][0]["id"]
        }

        let response2 = await db.query('INSERT INTO alunotreinos SET ?', [alunoTreino])

        for (var i = 0; i < exercicios.length; i++) {
            
            let dados = {
                "idtreino": idTreino[0][0]["id"],
                "idexercicio": exercicios[i]
            }

            let response = await db.query('INSERT INTO treinoexercicio SET ?', [dados])
         }
         
         res.redirect('/telaTreinos');
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