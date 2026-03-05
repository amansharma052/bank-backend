const mongoose =require("mongoose")

const transactionSchema = new monggose.Schema({
    fromAccount:{
        type:mongoose.Schema.type.ObjectId,
        ref:"account",
        required:[true,"transaction must be requird with a from account "],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.type.ObjectId,
        ref:"account",
        required:[true,"transaction must be requird with a to account "],
        index:true

    },
    status:{
        type:String,
        enumn:{
            values:["pending","completed","failed","reversed"],

        },
        default:"pending"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required to make a transcation"],
        min:0
    },
    idempotencyKey:{
        type:String,
        require:[true,"key is required for creating  a transaction"],
        index:true,
        unique:true
    },



})




const transactionModel = mongoose.model("transaction",transactionSchema)

module.exports =transactionModel