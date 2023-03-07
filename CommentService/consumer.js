const rabbitConnection = require('../sharedRabbitMqResource.js')
const Interpreter      = require('./repos/payloadInterpreter');
const MessageCreator   = require('./repos/payloadCreator');
const pub              = require('./publisher.js')

let channel;

const consume = async ()=>{
    try { 
        let msg;
        const connection = await rabbitConnection;
        if(channel === undefined){
           channel = await connection.createChannel();
        }
        const qok = await channel.assertQueue("",{ exclusive: true});
        const bindQueue = await channel.bindQueue("","Blog","");
        await channel.consume("", message =>{
            msg = JSON.parse(message.content);
            const interpreter = new Interpreter(msg);
            interpreter.interpret()
            .then((m)=>{
                 console.log('then of interpreter in consumer: ' +m);
                 channel.ack(message);
             })
            .catch((e)=>{
                console.log('console.log message from catch of interpreter in consumer: '+ e);
                console.log('console.log message from catch of interpreter in consumer: er is een fout ontstaan. Dit wordt aan de report service gemeld');
                //Eventueel kan er naar een report service geschreven worden via de 
                //Event Broker
                const messageCreator = new MessageCreator('delete',msg.value.id,"","");
                let value            = messageCreator.getPayload();
                pub(value);
            })
        }); 
    } catch (error) {
        //Eventueel kan er naar een report service geschreven worden via de 
        //Event Broker
        console.log (`error is: ${error}`);
    }


}

module.exports.consume=consume();
