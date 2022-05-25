const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());

const ControllerUsers = require('./controllers/ControllerUsers');

var urlencodeParser = bodyParser.urlencoded({ extended: false});
//USUARIOS
app.use(express.static('C:/Users/Victor/Desktop/SoCresceProjeto/Front'));
app.use(express.static('C:/Users/Victor/Desktop/SoCresceProjeto/Front/css'));

app.post('/usuario/insert',               ControllerUsers.insert);
app.put('/usuario/update/:id',            ControllerUsers.update);
app.get('/usuarios',                      ControllerUsers.ProcurarTodosOsUsuarios);
app.post('/selecionarusuario', urlencodeParser, ControllerUsers.ProcurarUsuarioPorEmailSenha);
//app.delete('/usuario/:senha',             ControllerUsers.delete);

app.post('/login', async (req, res) => {

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
});



//https://www.youtube.com/watch?v=TNZQqzbv-QY
const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
    console.log(`API RODANDO NA PORTA ${PORT}`);
})