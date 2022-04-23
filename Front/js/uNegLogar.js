//Método que verifica se o usuario existe e libera o login
function ValidarCredenciais(email, senha){
   
    (async () =>{
        //Instancia a classe Dao
        const db = require("../Dao/db");
        
        //Verifica se o SQL retonou algum registro compativel com os filtros
        const PodeLogar = await db.ValidarEmailSenha(email, senha);
        console.log(PodeLogar);

        //Se Achou o user e senha então deixa logar
        if (PodeLogar == true)
            console.log("Logou")
        else
            console.log("Não Logou")  
    })();

}


module.exports = {ValidarCredenciais}