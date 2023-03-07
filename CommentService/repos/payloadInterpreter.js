const repo             = require('../repos/blogcommentRepo');



class PayloadInterpreter{
    constructor(payload){
        this.payload = payload;
        this.repo = repo;
    }
    async interpret(){ return new Promise(async (resolve,reject)=>{
            try{
                await this.#action();
                resolve('interpret message from broker was succesfully processed');
            }catch(e){
                reject('interpret function: ' + e);
            }   
        })        
    }
    async #action(){
        try{
            if(this.payload.action == "delete"){
                //call delete action in repo
                let value = this.payload.value.id
                await this.repo.delete(value);
                return;
            }
            if(this.payload.action == "create"){
                await this.repo.putMessage({
                    blogpostUsername: this.payload.value.id
                    //error test is : null
                });
                return;
            }
        }catch(e){
            throw 'Throwed in #action: error occurred in service check of private method #action in comment service';
        }
        
    }
}

module.exports = PayloadInterpreter;