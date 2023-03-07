const rabbitConnection = require('../sharedRabbitMqResource.js')
const Interpreter      = require('./repos/payloadInterpreter');

let channel;

const consume = async ()=>{
    try { 
        let msg;
        const connection = await rabbitConnection;
        if(channel === undefined){
           channel = await connection.createChannel();
        }

        const qok       = await channel.assertQueue("",{ exclusive: true});
        const bindQueue = await channel.bindQueue("","Blog","");
        await channel.consume("", message =>{
            console.log("Wacht op messages...");
            
            msg               = JSON.parse(message.content);
            const interpreter = new Interpreter(msg);
            
            interpreter.interpret()
            .then((m)=>{
                 console.log(m);
                 channel.ack(message);
             })
            .catch((e)=>{
                console.log(e);
                console.log('er is een fout ontstaan. Dit wordt aan de report service gemeld')
                //Eventueel kan er naar een report service geschreven worden via de 
                //Event Broker
            })
        }); 

    } catch (error) {
        //Eventueel kan er naar een report service geschreven worden via de 
        //Event Broker (https://microservices.io/patterns/observability/application-logging.html)
        console.log (`error is: ${error}`);
    }
}

module.exports=consume();