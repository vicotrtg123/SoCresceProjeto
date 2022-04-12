

(async () =>{
    const db = require("./db");
    console.log("passou");

    const clientes = await db.carregar();
    console.log(clientes);
})();