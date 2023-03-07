const rabbitConnection = require('../sharedRabbitMqResource.js')
let channel;
startup();
async function startup(){ 
    try {
        const connection = await rabbitConnection;
        if(channel === undefined){
            channel = await connection.createChannel();
        }
        await channel.assertExchange("Blog","fanout",{durable:true}); 
    }catch (error) {
        console.log ('err in publisher (startUp()) : ' +error);
    }
}
const publish = async function publish(msg){ 
    try { 
          await channel.publish("Blog","",Buffer.from(JSON.stringify(msg)));  
    }catch (error) {
        console.log ('err in publisher (publish()): ' +error);
    }
}

module.exports = publish;