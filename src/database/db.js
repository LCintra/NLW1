// importar a depedência do sqlite3
const sqlite3 = require("sqlite3").verbose()
//iniciar o objeto de banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto de banco de dados para nossas operações

db.serialize(() => {     //criar uma tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //inserir dados na tabela 
    /*const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "N 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos,Lâmpadas"
    ]
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com Sucesso")
        console.log(this) //referenciando a resposta que o run ta trazendo, this não funciona nas arrows functions
    }
    db.run(query,values,afterInsertData)   //o código não ficará esperando isso acabar para continuar rodando as outras linhas, terceiro parâmetro é um callback, ela será ativada quando terminar de inserir os valores dentro das tabelas    
    
    //deletar um dado da tabela
    */
    db.run(`DELETE FROM places WHERE id = ?`, [7], function (err){
        if(err){
            return console.log(err)
        }
        console.log("Registro Deletado com Sucesso")
    }) 
    //consultar os dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui Estão seus registros")
        console.log(rows)
    }) 
}) 