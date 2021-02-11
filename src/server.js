const express = require("express")
const server = express()
//pegar o banco de dados
const db = require("./database/db.js")
//configurar pasta pública
server.use(express.static("public"))
//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended:true}))
//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})  //Primeiro argumento é onde estão os htmls e o segundo é um objeto


//Configurar caminhos para a aplicação
//Página Inicial
//Req: Requisição 
//Res:Resposta
server.get("/",(req,res) =>{
    return res.render("index.html", {title:"Seu Marketplace de Coleta de Resíduos"}) //dirname dá o diretório que você está, nesse caso src
})
server.get("/create-point",(req,res) =>{
    //console.log(req.query) //query strings da nossa url, só funciona em get, no post ñ
    return res.render("create-point.html")
})
server.post("/savepoint", (req,res) =>{
    //console.log(req.body)//req.body: O corpo do nosso formulário 
    const query = `
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no Cadastro")
        }
        console.log("Cadastrado com Sucesso")
        console.log(this) //referenciando a resposta que o run ta trazendo, this não funciona nas arrows functions
        return res.render("create-point.html", {saved:true}) 
    }
    db.run(query,values,afterInsertData)
})
server.get("/search-results",(req,res) =>{
    const search = req.query.search
    if(search==""){
        //pesquisa vazia
        return res.render("search-results.html",{total:0})
    }
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html",{places:rows,total:total})
    })
})
server.listen(3000)  //Ligar o Servidor