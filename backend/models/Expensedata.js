const mongoose=require('mongoose');
const expeseschema=new mongoose.Schema({
    grocery:{type:Number, required:true},
    travel:{type:Number, required:true},
    medical:{type:Number, required:true},
    misc:{type:Number, required:true},

});
module.exports=mongoose.model('Expensedata',expeseschema);