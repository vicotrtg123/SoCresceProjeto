
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

async function ValidarEmailSenha(email, senha){
    const conn = await connect();
    const sql = 'Select * from usuario where email=? and senha=?;';
    const values = [email, senha];
    
    //return await conn.query(sql, values);
    const usuario = await conn.query(sql, values);
    
    if(usuario !== '')
        return true
    else    
        return false
} 

module.exports = {CarregarTodosUsuarios, ValidarEmailSenha}
