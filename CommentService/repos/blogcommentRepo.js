const BlogComment = require('../models/comment');  //database


class BlogCommentRepo{
    putMessage(value){ return new Promise((resolve,reject)=>{
        console.log(`${JSON.stringify(value)} : in Blogcomment repo class`)
        const blogcomment = new BlogComment(value)    
        blogcomment.save() 
        .then(savedValue =>{
            console.log(savedValue);
            resolve(savedValue)
        }).catch(e =>{
            console.log('overige error')
            reject('Error in repo.putMessage: ' + e);
            })
        })
    }
    delete(value){return new Promise((resolve,reject)=>{
        BlogComment.deleteMany({blogpostUsername:value}).then(()=>{
            resolve("gelukt");
        }).catch((e)=>{
            console.log("niet gelukt");
            reject('niet gelukt');
        })
     })
    }
    async update(value,commentUsername){
        try{
            let filter = {blogpostUsername:value.blogpostUsername,username:'noValue'};
            let update = {username:commentUsername,content:value.content}; 
            let result = await BlogComment.findOneAndUpdate(filter,update,{new : true});
            if (result==null){
                throw 'Het bericht is niet geplaatst!'
            }
            console.log(`Comment has been saved for blogpost: ${value.blogpostUsername}`);
        }catch(e){
            console.warn(`Comment failed for blogpost: ${value.blogpostUsername}`);
            throw `Throwed in update: ${e}`;
        }
        

    }
}

module.exports = new BlogCommentRepo();