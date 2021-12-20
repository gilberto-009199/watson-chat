/* Importando bibliotecas basicas do projeto */
var http        = require('http');
var express     = require('express');
var bodyParser  = require('body-parser')
var fs          = require('fs-extra');
var path        = require('path');
var socket      = require('socket.io');

// Pega a configuração do arquivo .env

//require('dotenv').config({path: __dirname + '/.env'})

/* Colocando os caminhos  */
global.dir = {};
global.dir.root = __dirname; // Diretorio do projeto
global.dir.controller = path.join(global.dir.root,'controller');// Diretorio das controllers
global.dir.utils = path.join(global.dir.root,'utils');// Diretorio das controllers

/* Criando server  */
const port = process.env.PORT || 8080;

const host = 'localhost';
const protocol = 'http';

var app = express();
/* Configurando */
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');// Setamos que nossa engine será o ejs(Exibição das paginas)

// Tirando aquela bobagem de cords origin do ajax
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Pegando database */
global.db = require(global.dir.root + '/db.js')

var server = http.createServer(app);



/* STARTANDO SERVER */
server.listen(port,()=>{

  console.log(" \033[1;35m  @SERVER " + protocol + "://" + host + ":" + port + " \033[0m ");
  
  /* Levantar o servidor do socket io */
  //var io     = socket.listen(server);
  
  /* Passando para o arquivo socket.io.js o nosso io( Todo Poderoso ) */
  //var ws_server = require(__dirname + '/socket.io.js')(io);

  //console.log("WS_SERVER : ",ws_server);

})

app.get('/',(req,res)=>{
  
  res.send('Oi mae!!');

})
app.get('/home',(req,res)=>{
  
  res.render('home',{users:[
        {id:1,name:'gil'},
        {id:1,name:'claudio'},
        {id:1,name:'guilherme'}
    ]});

})






// Passa por cada arquivo dentro de controller e o inicia
fs.readdirSync(global.dir.controller).forEach( controllerName => {
    var controller = path.join(global.dir.controller, controllerName)

    // O requisita, e já envia um novo express.Router
    app.use(require(controller)(new express.Router()));
});
/* Permitindo acesso aos arquivos dentro de assets para o usuario */
app.use(express.static(__dirname + '/assets'));
/*
  + acesse http://localhost:8080/js/home.js

  Segunda forma definir um caminho:
  
  + app.use('/public', express.static(__dirname + '/assets'));
  + acesse http://localhost:8080/public/js/home.js

*/
