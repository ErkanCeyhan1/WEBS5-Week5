const amqp = require('amqplib');
const uri = 'amqp://127.0.0.1:5672';//

module.exports  = amqp.connect(uri)



//let channel;
// amqp.connect(uri).then(conn =>{
//     channel = conn.createChannel();
// }).catch(err => {console.log(err + 'sharedRabbitMqResource')})

//module.exports = channel;//amqp.connect(uri);


