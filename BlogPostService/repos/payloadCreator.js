
let payloadTestStructure = {}

class PayloadMessageCreator{
    constructor(action,id,fieldName,dataValue){
            this.#create(action,id,fieldName,dataValue);
    }
    #create(action,id,fieldName,dataValue){
        this.payloadTestStructure = 
            {
                "fromService":"post",
                "action": action,
                "value":{
                    "id":id,
                    "fieldName":fieldName,
                    "dataValue":dataValue
                }
            };            
    }
    getPayload(){
        return this.payloadTestStructure;
    }
}

module.exports = PayloadMessageCreator;