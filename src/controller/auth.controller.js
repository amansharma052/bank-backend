const userModel =require("../module/user.module")
const jwt=require('jsonwebtoken')

 async function userRegisterController(req,res){
    const {email,password,name} =req.body

    const isExists = await userModel.findOne({email}).select("+password")
    
    if(isExists){
        return res.status(422).json({
            message:"user already exists"
        })
    }
    const user =await userModel.create({
        email, password, name
    })

    const token =jwt.sign({userId:user._id},
        process.env.JWT_SECRET
    )
    res.cookie("token",token)
    res.status(201).json({
        user:{
            _id: user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}

async function userLoginController(req,res){

    const {email ,password} =req.body

    const user =await userModel.findOne({email})
     
    if(!user){
        res.status(401).json({message:"user not found"})
    }


    const isVailidUserPassword = await user.comparePassword(password)

    if(!isVailidUserPassword){
        return res.status(401).json({
            message:"user not found"
        })
    }

    const token =jwt.sign({userId:user._id},
        process.env.JWT_SECRET
    )
    res.cookie("token",token)
    res.status(200).json({
        user:{
            _id: user._id,
            email:user.email,
            name:user.name
        },
        token
    })
}


module.exports ={userRegisterController,userLoginController}