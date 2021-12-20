var path        = require('path');
const ManagerWatson =  require(path.join(global.dir.utils,'watson','manager.watson.js'));

var  service = new ManagerWatson();
service.build()

module.exports = (router) => {
    

    
    router.get('/watson', async (req,res)=>{
        console.log(req.query);
        
        sessionId = req.query.sessionId;
        menssage  = req.query.message;


        // Verifica se já existe uma sessao
        if(!sessionId)sessionId = await service.createSession();
         
        menssageOfBot  = await service.sendMessage(sessionId, menssage);
        
        // Verifica se o bot respondeu ou deu erro de expiração da sessao
        if(!menssageOfBot){
            // Se a sessão expirou cria uam nova e envia a menssagem novamente!
            sessionId      = await service.createSession();
            menssageOfBot  = await service.sendMessage(sessionId, menssage);
        }

        res.send({
            success:true,
            menssage:{
              sessionId,
              menssage:menssageOfBot["output"]["generic"][0]["text"]
            }
        });
    });
    
    return router;
}