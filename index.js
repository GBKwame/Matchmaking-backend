const dotenv=require('dotenv').config();
const express=require('express');
const connectDB=require('./db/db.connect');
const path=require('path');
const profileRouter=require('./src/routes/user.rotes.js');
const AdminRouter=require('./src/routes/admin.routes.js')
const cors=require('cors');
const app=express();

connectDB();

const coreOptions = {
    origin:process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}
app.use(cors(coreOptions))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use('/user-api',profileRouter)
app.use('/admin-api',AdminRouter)

const PORT = process.env.PORT || 3000;


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})
