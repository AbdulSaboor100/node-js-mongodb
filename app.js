import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import AppUser from './models/schema.js';
import morgan from 'morgan';

const app = express();
const port = 5000;

mongoose.connect(`mongodb+srv://saboor:saboor123@cluster0.c5kmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
mongoose.connection.once('open',()=>{
    console.log('FBI database hacked');
})

mongoose.connection.on('error',()=>{
    console.log('Black Vigo Is On Your Door Steps')
})


app.use(bodyParser.json({limit:'2mb'}));
app.use(morgan('tiny'))


app.post('/register' ,async (req,res)=>{
    console.log(req.body);
    let user = new AppUser({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
   try {
    let userData = await user.save()
    res.json(userData)
   } catch (error) {
       console.log(error.message)
   }
})


app.get('/get-user/:name' , async (req,res)=>{
    let { name } = req.params
    try {
        let all_users = await AppUser.find({name : name})
        res.json(all_users)
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/get-user/:pages/:limit' , async (req,res)=>{
    let { pages , limit } = req.params;
    let skipCount = (pages - 1) * limit;
    try {
        let all_users = await AppUser.find().limit(limit).skip(skipCount)
        res.json(all_users)
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(port , ()=>{
    console.log(`server running at ${port}`)
})