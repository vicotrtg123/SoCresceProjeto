

//(async () =>{
    //const db = require("./db");
    //console.log("passou");

    //const clientes = await db.ValidarEmailSenha("wdwd", "123");
  //  console.log(clientes);
//})();



//(async () =>{
    //const db = require("./db");
    //console.log("passou");

    //const PodeLogar = await db.ValidarEmailSenha("wdwd", "123");
    //console.log(PodeLogar);

    //if (PodeLogar == true)
    //console.log("Logou")
  //  else
   // console.log("Não Logou")  
//})();

(async () =>{
  //Instancia a classe Dao
  const db = require("../Dao/db");
  
  //Verifica se o SQL retonou algum registro compativel com os filtros
  const PodeLogar = await db.ValidarEmailSenha("victor", "123");
  console.log(PodeLogar);

  //Se Achou o user e senha então deixa logar
  if (PodeLogar == true)
      console.log("Logou")
  else
      console.log("Não Logou")  
})();
