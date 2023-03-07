const Blogpost = require('../models/post');


class BlogPost{
    putMessage(value){ return new Promise((resolve,reject)=>{
        const blogpost = new Blogpost(value)    
        blogpost.save() 
        .then(savedValue =>{
            if(savedValue){
                resolve(savedValue)
                return;
            }
        }).catch(e =>{
                reject(e);
            })
        })        
    }
    delete(value){return new Promise((resolve,reject)=>{
        Blogpost.deleteMany({username:value})
        .then(()=>{
            resolve("gelukt in de blogpost");
        }).catch((e)=>{
            //https://microservices.io/patterns/observability/application-logging.html
            reject(`weer niet gelukt: ${e}`);
        })
     })
    }
}

module.exports = new BlogPost();