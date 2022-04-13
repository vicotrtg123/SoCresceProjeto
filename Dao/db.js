
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected' )
        return global.connection;

    const mysql = require("../ItensIgnorar/node_modules/mysql2/promise");
    const connection = await mysql.createConnection("mysql://root:1234@localhost:3306/socresce");
    console.log("Conectou");
    global.connection = connection;
    return connection;
} 

connect();

async function CarregarTodosUsuarios(){
    const conn = await connect();
    const [rows] = await conn.query('Select * from usuario;');
    return rows;
} 

module.exports = {CarregarTodosUsuarios}
