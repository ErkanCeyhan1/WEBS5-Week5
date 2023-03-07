const Mongoose = require('mongoose');

const commentSchema = new Mongoose.Schema({
    content:{type: String},
    blogpostUsername:{type: String, required:true},
    username:{type:String, required:true,default: 'noValue'}
})


module.exports = Mongoose.model('BlogComment',commentSchema);