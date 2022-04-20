

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
    const db = require("../js/uNegLogar");

    db.ValidarCredenciais("ff", "1234");
 
})();
