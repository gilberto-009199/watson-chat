/* Sistema que cuida do socket io  e seus dominios */

module.exports = (io) => {
    
    io.on('connection', function(socket){ 
      
      console.log("Recebida noa solicitação WebSocket!!!Socket.io conectado");

      /* Epações para brincar de emit <--> on com o front- end!!! */
      
      socket.on('disconnect', function(){ 
        console.log("Cliente desconectado!!!");
      });

    });

    return this;
}