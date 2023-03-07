const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3014;
const pub = require('./publisher.js')
const repo    = require('./repos/blogcommentRepo');
require('./mongooseConnection');
require('./consumer.js')


app.use(cors());
app.use(express.json());

app.patch('/comments/:commentusername',async(req,res)=>{
    try{
        let id     = req.params.commentusername;
        let value  = req.body;
        let result = await repo.update(value,id);
        res.status(202).send(`Bericht is geplaatst : ${result.username} `);
    }catch(err){
        res.status(404).send(err);
    }
})


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})