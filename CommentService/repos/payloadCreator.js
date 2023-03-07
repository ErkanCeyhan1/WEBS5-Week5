let payloadTestStructure = {}

class PayloadMessageCreator{
    constructor(action,id,fieldName,dataValue){
            this.#create(action,id,fieldName,dataValue);
    }
    async #create(action,id,fieldName,dataValue){
        try{
            this.payloadTestStructure = 
                {
                    "fromService":"comment",
                    "action": action,
                    "value":{
                        "id":id,
                        "fieldName":fieldName,
                        "dataValue":dataValue
                    }
                };            
            }catch(e){
                throw e;
            }   
    }
    getPayload(){
        return this.payloadTestStructure;
    }
}

module.exports = PayloadMessageCreator;