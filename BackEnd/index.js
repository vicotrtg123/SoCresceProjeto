const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

const ControllerUsuarios = require('./controllers/ControllerUsuarios');
const ControllerInstrutores = require('./controllers/ControllerInstrutores');

var urlencodeParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('C:/Users/luiza/Downloads/Proj. Soft. 2/SoCresce/Front'));
app.use(express.static('C:/Users/luiza/Downloads/Proj. Soft. 2/SoCresce/Front/css'));

//operacoes usuarios
app.get('/',       ControllerUsuarios.login);
app.post('/usuario/insert',  urlencodeParser, ControllerUsuarios.insert);
app.post('/selecionarusuario', urlencodeParser, ControllerUsuarios.ProcurarUsuarioPorEmailSenha);
app.get('/login', ControllerUsuarios.logar);
app.get('/cadastro', ControllerUsuarios.cadastro);
app.get('/perfil', ControllerUsuarios.perfil);
app.post('/atualizarPerfil',  urlencodeParser, ControllerUsuarios.atualizarPerfil);

//operacoes treinos
app.get('/telaTreinos', ControllerUsuarios.telaTreinos);
app.get('/cadastrarNovoTreino', ControllerUsuarios.cadastrarNovoTreino);
app.post('/resultadoTreino',  urlencodeParser, ControllerUsuarios.resultadoTreino);
app.post('/resultadoFinalTreino',  urlencodeParser, ControllerUsuarios.resultadoFinalTreino);
app.post('/vizualizarTreino',  urlencodeParser, ControllerUsuarios.vizualizarTreino);
app.post('/atualizarTreino',  urlencodeParser, ControllerUsuarios.atualizarTreino);
app.post('/avaliarTreino',  urlencodeParser, ControllerUsuarios.avaliarTreino);
app.post('/excluirTreino',  urlencodeParser, ControllerUsuarios.excluirTreino);
app.get('/confirmacaoTreino', ControllerUsuarios.confirmacaoTreino);
app.post('/salvarAvaliacao',  urlencodeParser, ControllerUsuarios.salvarAvaliacao);

//operacoes instrutores
app.get('/instrutores',  ControllerInstrutores.ProcurarTodosOsInstrutores);

//operacoes de tela
app.get('/erro',   ControllerUsuarios.erro);
app.get('/home',   ControllerUsuarios.home);

//https://www.youtube.com/watch?v=TNZQqzbv-QY
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
    console.log(`API RODANDO NA PORTA ${PORT}`);
})