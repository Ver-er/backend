const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const Users = require('./models/Users')
const bcrypt = require('bcryptjs')
const Recipe = require('./models/Recipe')

const app = express()
const PORT = 3000
app.use(express.json());

//Home page api
app.get('/',(req, res)=>{
    res.send('<h1 align=center>Welcome to the MERN stack week 2 session<h1>')
})

//Registration page api
app.post('/register',async(req, res)=>{
    const {username,email,password} = req.body
    try{
        const hashPassword = await bcrypt.hash(password, 10)
        const user= new Users({username,email,password:hashPassword})
        await user.save()
        res.json({message:"User registered"})
        console.log('User registered successfully')

    }
    catch(err)
    {
        console.log(err)
    }
})

//Login page api
app.post('/login',async(req, res)=>{
    const {email,password} = req.body
    try{
        const user = await Users.findOne({email})
        if (!user || !(await bcrypt.compare(password, user.password)))
            {
            return res.status(400).json({message: "Invalid credentials"})
            }
        res.json({message:"User logged in", username:user.username})
    }
    catch(err)
    {
        console.log(err)
    }
})

//create recipe api
app.post('/recipe', async (req, res) => {
    const { title, description, imageUrl, cookingTime, difficulty, category } = req.body
    try {
        const recipe = new Recipe({ title, description, imageUrl, cookingTime, difficulty, category })
        await recipe.save()
        res.json({ message: "Recipe created successfully" })
        console.log('Recipe created successfully')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error creating recipe" })
    }
})

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('DB connected successfully...')).catch((err)=>console.log(err))


app.listen(PORT, (err) => {
    if(err)
    {
        console.log(err)
    }
    console.log(`Server is running on port ${PORT}`)
})