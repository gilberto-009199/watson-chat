const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

//const apikey      = 'IPyInhW3MK--gihmNpdYuM0QjhgxjAxLCb6AwQL8q3Nq';
//const apikey      = '-aMIvhGV694Ft9-WWNc5Oz6GKl56EXYLpOY-01qR8J3x';
const apikey        = 'TOANailup4dgM7lfEUV-GgywVSdIWlGN67I7-pzUihEI';
const assistantId = '469afca5-e57b-4ce6-899a-849d02f8b812';
//const assistantId = '40e242ae-d4e2-4cef-b3db-f8453b0693ff';

class Manager{
	
	constructor(){
		this.assistant = false;
		this.sessions  = {};
	}
	
    sendMessage(sessionId,  message){
        console.log("@Enviando ..... ",message)
    	return this.assistant.message({
			input: { text: message },
			assistantId: '4ec50193-b8f9-42d6-bc50-f3521383c297',
			sessionId: sessionId,
		  }
		  )
		  .then( response => {
			console.log(JSON.stringify(response.result,null,2));
			return (response.result);

		  })
		  .catch(err => {
            console.log(err)
                console.log("@Erro ::>",err)
				switch(err.status){
					case 404:
						console.log("Erro Sessão espirou!")
						return false;
				}
			
		  });
    }

	createSession(){
		let ctx = this;
		return this.assistant.createSession({
		  assistantId: '4ec50193-b8f9-42d6-bc50-f3521383c297',
		})
		.then(res => {
			
			console.log("Session Created!!")
			console.log(res.result)
            ctx.sessions[res.result["session_id"]+""] = new Date().getTime()
		    return res.result["session_id"];
		})
		.catch(err => {
		 console.log("Erro!!!!\n");
		 console.log(err);
		 return err;
		});
	}
    
	// Cria o assistant
	create(){
	  build();	
	}

	build(){
	  console.log("BUILD CHAMADO")
	 if(!this.assistant)this.assistant = new AssistantV2({
						  version: '2020-04-01',
						  serviceName:'assistant',
						  authenticator: new IamAuthenticator({
							apikey: 'PXjL2qLfXRUS1NDyTx281edvtE5JQFlRbluSjNdFUF9i',
							//url: 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/a328afd3-95ed-449c-a33d-9ca8e5add507'
						  }),
						  //url: 'https://gateway.watsonplatform.net/assistant/api/',
						  url: 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/a328afd3-95ed-449c-a33d-9ca8e5add507',
						  //serviceUrl:'https://api.us-east.assistant.watson.cloud.ibm.com/instances/f71d801a-6ba6-44c2-90e0-3da304c82619',
						  //disableSslVerification: true
					 });
	console.log("BUILD EXCECUTADO")

	  	
	}


}
module.exports = Manager;

//export default Manager;
