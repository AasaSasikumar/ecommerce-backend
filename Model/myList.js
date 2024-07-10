const mongoose = require("mongoose");

const myListSchema = new mongoose.Schema(
    {

    ProductTitle:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    
    image:{
      type:String,
      required:true
    },
    productId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
});
   myListSchema.virtual('id').get(function(){
    return this._id.toHexaString();
   })
  myListSchema.set('toJSON',{
    virtuals:true,
  })
    


exports.MyList =mongoose.model('MyList',myListSchema);
exports.myListSchema=myListSchema;


