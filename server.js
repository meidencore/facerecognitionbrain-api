import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import cors from "cors";
import knex from "knex";
import handleSignin from './controllers/signin.js';
import handleSignup from "./controllers/signup.js";
import handleProfile from "./controllers/profile.js";
import handleImage from "./controllers/image.js";


const db = knex({
    client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smart-brain'
  }
})


const app = express();
app.use(bodyParser.json())
app.use(cors())


app.post('/signin', handleSignin(db, bcrypt))
app.post('/signup', handleSignup(db, bcrypt))
app.get('/profile/:id', handleProfile(db))
app.put('/image', handleImage(db))

app.listen(3000, ()=> {
    console.log("server listening on PORT 3000")
})