const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req,res) => {
    const {username,password,profile_pic,name} = req.body
    const user = await db.user.findOne({where:{username}}) //short form (username:username)
    if(user){
        res.status(400).send({message:'Username taken'})
    }else{
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS))
        const hashedPassword = bcrypt.hashSync(password,salt)
        await db.user.create({username,password:hashedPassword,name,profile_pic})
        res.status(200).send({message:"User created"})
    }
}
const login = async(req,res) => {
    const {username,password} = req.body
    const user = await db.user.findOne({where:{username}})
    const isSuccess = bcrypt.compareSync(password,user.password)
    if(!user || !isSuccess){
        res.status(400).send({message:'username or password not found'})
    }
    else{
        const payload = {
            id:user.id,
            name:user.name
        }
        const token = jwt.sign(payload,process.env.SECRET,{expiresIn:3600})
        res.status(200).send({token,message:"User found & logged in"})
    }
}

module.exports = {
    login,register
}