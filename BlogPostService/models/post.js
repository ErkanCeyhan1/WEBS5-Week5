const Mongoose = require('mongoose');

const postSchema = new Mongoose.Schema({
    content:{type: String},
    username:{type:String,unique:true, required:true}
})

const Blogpost = Mongoose.model('BlogPost',postSchema);
module.exports =  Blogpost;