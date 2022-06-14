const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

const ControllerUsers = require('./controllers/ControllerUsers');
const ControllerInstrutores = require('./controllers/ControllerInstrutores');

var urlencodeParser = bodyParser.urlencoded({ extended: false});

app.use(express.static('C:/Users/luiza/Downloads/Proj. Soft. 2/SoCresce/Front'));
app.use(express.static('C:/Users/luiza/Downloads/Proj. Soft. 2/SoCresce/Front/css'));

//operacoes usuarios
app.post('/usuario/insert',  urlencodeParser, ControllerUsers.insert);
app.put('/usuario/update/:id',            ControllerUsers.update);
app.put('/usuario/delete/:id',            ControllerUsers.delete);
app.get('/usuarios',                      ControllerUsers.ProcurarTodosOsUsuarios);
app.post('/selecionarusuario', urlencodeParser, ControllerUsers.ProcurarUsuarioPorEmailSenha);

//operacoes de tela
app.get('/',       ControllerUsers.login);
app.get('/erro',   ControllerUsers.erro);
app.get('/home',   ControllerUsers.home);
app.get('/login', ControllerUsers.logar);
app.get('/cadastro', ControllerUsers.cadastro);
app.get('/telaTreinos', ControllerUsers.telaTreinos);
app.get('/cadastrarNovoTreino', ControllerUsers.cadastrarNovoTreino);
app.get('/instrutores',  ControllerInstrutores.ProcurarTodosOsInstrutores);
app.get('/confirmacaoTreino', ControllerUsers.confirmacaoTreino);
app.post('/resultadoTreino',  urlencodeParser, ControllerUsers.resultadoTreino);
app.post('/resultadoFinalTreino',  urlencodeParser, ControllerUsers.resultadoFinalTreino);


//https://www.youtube.com/watch?v=TNZQqzbv-QY
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
    console.log(`API RODANDO NA PORTA ${PORT}`);
})