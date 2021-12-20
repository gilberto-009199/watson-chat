const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

const ManagerWatson =  require('./manager.watson.js');


let mw = new ManagerWatson();


mw.build()

let terminal = async ()=>{
    console.log("Build finalizado!")
    console.log("Opções:")
    console.log(" 1 - Gerar uuid de uma sessão");
    console.log(" 2 - Digite o uuid de sessão");
    sessionId = null;
    
    opcao = await askQuestion("Digite a opção desejada! (1/2)}> ");  

    switch(opcao){
      case "1":
        
        sessionId = await mw.createSession();
        console.log("Sessao pega: ",sessionId);
        break;

      case "2":
        
        sessionId = await askQuestion("\n Digite o uuid da sessão }> "); 
        result = await mw.sendMessage(sessionId, "Aonde vc já trabalhou?");
        
        if (!result){
           console.log("Uuid inexistente ou Expirado!");
           return;
        }else console.log("O uuid foi aceito")

        break; 
    }
    
    console.log("\n CHAT ")
    while(true){
      message = await askQuestion("Digite sua pergunta! }> ")
      res = await mw.sendMessage( sessionId, message);
      if(!res)console.log("Uuid Expirado!");
      else{
        console.log("Voce : "+message) 
        console.log("ROBO : "+res["output"]["generic"][0]["text"])
      } 

    }
    

};
terminal()

//mw.sendMessage("b3d31733-00eb-4312-85e8-f614a26033d7","Aonde vc já trabalhou?")

//mw.sendMessage("67221e94-cc10-4f70-a3d3-e512c0972210","Aonde vc já trabalhou?")
/*mw.createSession().then( async res=>{

  console.log(res)
  mw.sendMessage(res, "Aonde vc já trabalhou?");
  


}).catch(err=>console.log(err));*/
