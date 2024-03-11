const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  docotrId:{
    type:String,
    required:true,
  },
  slots:[{
    
  }]
});