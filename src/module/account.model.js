const mongoose =require("mongoose")

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:[true,"Account must be associatited with a user"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["active", "frozen","closed"],
            message:"Status can be either Active Frozen or closed"
        }
    },
    currency:{
        type:String,
        required:[true,"currency is required for creating an account"],
        defalut:"INR"
    }
})

accountSchema.index({user :1,  status :1})

const accountModel = mongoose.model("account",accountSchema)

module.exports= accountModel