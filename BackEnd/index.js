const express = require('express');
const app = express();

app.use(express.json());

const ControllerUsers = require('./controllers/ControllerUsers');

//USUARIOS
app.use(express.static('C:/Users/Victor/Desktop/SoCresceProjeto/Front'));
app.use(express.static('C:/Users/Victor/Desktop/SoCresceProjeto/Front/css'));

app.post('/usuario/insert',               ControllerUsers.insert);
app.put('/usuario/update/:id',            ControllerUsers.update);
app.get('/usuarios',                      ControllerUsers.ProcurarTodosOsUsuarios);
app.get('/selecionarusuario',             ControllerUsers.ProcurarUsuarioPorEmailSenha);
//app.delete('/usuario/:senha',             ControllerUsers.delete);


//https://www.youtube.com/watch?v=TNZQqzbv-QY
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
    console.log(`API RODANDO NA PORTA ${PORT}`);
})