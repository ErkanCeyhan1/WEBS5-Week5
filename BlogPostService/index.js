const express        = require('express');
const app            = express();
const cors           = require("cors");
const port           = process.env.PORT || 3015;
const pub            = require('./publisher.js');
const repo           = require('./repos/blogpostRepo');
const MessageCreator = require('./repos/payloadCreator');
require('./mongooseConnection');
require('./consumer.js'); //For starting consumer


app.use(cors());
app.use(express.json());

//Opdracht 1 en 2 van LW4
app.post('/posts',async(req,res)=>{
    try{
        let orgValue         = req.body;
        let result           = await repo.putMessage(orgValue);
        res.status(202).send(`Uw bericht is geplaatst! Id is: ${result.username}.`);
        
        const messageCreator = new MessageCreator('create',orgValue.username,"","");
        let value            = messageCreator.getPayload();
        await pub(value); //Dit is bijv. nodig om te voorkomen dat een zelf verzonnen 
                          //blogpostusername een commentaar kan plaatsen. 
                          //Hier wordt de username ook opgeslagen in de comment service.

    }catch(err){
        res.status(400).send('Username is niet uniek.');
    }
})

//Opdracht 4 van LW4
app.delete('/posts/:blogpostUsername',async(req,res)=> {
    try{
        let id               = req.params.blogpostUsername;   
        let result           = await repo.delete(id);

        res.send("afkomstig van Blogpost Service");
        
        //payload creation for publisher
        const messageCreator = new MessageCreator('delete',id,"","");
        let value            = messageCreator.getPayload();
        await pub(value);

    }catch(err){
        res.send(`Er ging iets fout: ${err}`);
    }
})
app.listen(port, () => {
    console.log('Server is up on port ' + port);
})