class db {
    // METODO statico que cria a isntancia do banco
    static connect(){

        var mysql = require("mysql");
        
        /* Dados da conexão */
        let host        = process.env.MYSQL_HOST || 'localhost';
        let user        = process.env.MYSQL_USER || 'root';
        let senha       = process.env.MYSQL_PASS || '12345ola';
        let database    = process.env.MYSQL_DB || 'mob_share';


        var con = mysql.createConnection({
          host:host,
          user:user,
          password:senha,
          database:database
        });

        con.connect(erro=>{
         if(erro)console.log("Erro:",erro)
         else console.log("\n   Conexão bem sucedida  \n");
        });

        /* Mantém a Conexão ativa! Pingando a cada 14s */
        setInterval(()=>{
         con.query("SELECT 77");
        },17000);


        // Retorna o Id do dado inserido
        /*
          db.selectAll('INSERT INTO tbl_permissoes (nome, titulo) VALUES ('sadasda', 'asdasd')
          db.selectAll('tbl_permissoes (nome, titulo) VALUES ('sadasda', 'asdasd')
        */
        con.insert = function(sql, prepared, callback){

            return new Promise((resolve, reject) => {

                  if(sql.toString().toLowerCase().search('insert') < 0)sql = 'INSERT INTO '+ sql;

                  con.query(sql, prepared, (err, resposta) => {
                        if(err) reject(err);
                        // Devolvendo o id inserido
                        else resolve(resposta.insertId);

                  });

             });
        };
        // Retorna a lista de rows Afetadas
        /*
          db.selectAll('UPDATE tbl_permissoes SET id_permissoes = 0, nome = '' WHERE id = 27')
          db.selectAll('tbl_permissoes SET id_permissoes = 0, nome = '' WHERE id = 27')
        */
        con.update = function(sql, prepared, callback){

            return new Promise((resolve, reject) => {

                  if(sql.toString().toLowerCase().search('where') < 0)console.warn(" Atenção Update SEM WHERE !! ");

                  if(sql.toString().toLowerCase().search('update') < 0)sql = 'UPDATE '+ sql;


                  con.query(sql, prepared, (err, resposta) => {
                        if(err) reject(err);
                        // devolvendo o numero de linhas afetadas
                        else resolve(resposta.affectedRows);

                  });

             });
        };

        // Retorna as linhas
        /*
          db.selectAll('SELECT * FROM tbl_permissoes ')
          db.selectAll('tbl_usuario_desktop')
        */
        con.select = function(sql, prepared, callback){

            return new Promise((resolve, reject) => {

                  //if(sql.toString().toLowerCase().search('limit') < 0 )console.log(" Query sem limit!! Cuidado com a paginação companheiro! ");

                  if(sql.toString().toLowerCase().search('select') < 0)sql = 'SELECT * FROM '+ sql;

                  con.query(sql, prepared, (err, resposta) => {
                        if(err) reject(err);
                        else resolve(resposta);

                  });

             });
        };

        // Retorna a lista de rows Afetadas pelo delete
        /*
          db.selectAll('DELETE FROM tbl_permissoes WHERE id = 27 ')
          db.selectAll(' tbl_usuario_desktop where id = 27 ')
        */
        con.delete = function(sql, prepared, callback){

            return new Promise((resolve, reject) => {

                  if(sql.toString().toLowerCase().search('where') < 0)console.warn(" Atenção Delete SEM WHERE !! ");

                  if(sql.toString().toLowerCase().search('delete from') < 0)sql = ' DELETE FROM '+ sql;

                  con.query(sql, prepared, (err, resposta) => {
                        if(err) reject(err);
                        //Devolvendo o numero de linhas afetadas
                        else resolve(resposta.affectedRows);

                  });

             });
        };

        // Rotorna apenas uma Linha !! sem necessidade de colocar limit 1
        /*
          db.selectAll('SELECT * FROM tbl_usuario_desktop where id = 27 ')
          db.selectAll('SELECT * FROM tbl_usuario_desktop where id = 27 limit 1')
          db.selectAll('SELECT * FROM tbl_usuario_desktop where id = 27 ')
          db.selectAll(' tbl_usuario_desktop where id = 27 ')
        */
        con.selectById = (sql, prepared) => {
            return new Promise(function(resolve, reject){

              // Caso seja db.selectAll('SELECT * FROM tbl_usuario_desktop where id = 27 ')
              if(sql.toString().toLowerCase().search('limit') < 0)sql = sql + ' limit 1 ';

              // Caso seja db.selectAll(' tbl_usuario_desktop where id = 27 ')
              if(sql.toString().toLowerCase().search('select') < 0)sql = 'SELECT * FROM '+ sql;

               // Executa a query
               con.query(sql, prepared, (err, resposta) => {
                      if(err) reject(err);
                      else(resolve(resposta[0]));

               });

           });

        };
        // Rotorna O REULTADO DE SELECT * FROM <tabela_do_sql>
        /*
          db.selectAll('tbl_usuario_desktop')
          db.selectAll('SELECT * FROM tbl_usuario_desktop')
        */
        con.selectAll = (sql, prepared) => {
            return new Promise(function(resolve, reject){

                 // Mostra um aviso, caso a query não tenha limit
                 //if(sql.toString().toLowerCase().search('limit') < 0 )console.log(" Query sem limit!! Cuidado com a paginação companheiro! ");

                 if(sql.toString().toLowerCase().search('select') < 0)sql = 'SELECT * FROM '+ sql;

                 // Executa a query
                 con.query(sql, prepared, (err, resposta) => {
                        if(err) reject(err);
                        else(resolve(resposta));

                 });

           });

        };
        /* Metodo aberto Retorna oque o query fez! Para fazer insert,uptade,delete,select e etc */
        con.execute = function(sql, prepared, callback){

            return new Promise((resolve, reject) => {

                  con.query(sql, prepared, (err, resposta) => {
                        if(err) reject(err);
                        else resolve(resposta);

                  });

             });
        };
        return con;
    }
}
/* Retorna para o exports o return da função connect do objeto db */
module.exports = db;
