const mongoose =require('mongoose')

async function connectDB(){
    try {mongoose.connect(process.env.MONGO_URI)

        console.log("server is connected to db")


        
    } catch (error) {
        console.log("error while connecting to db",error)
        
    }

}

module.exports =connectDB;