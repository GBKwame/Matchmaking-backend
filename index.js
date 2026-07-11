const dotenv=require('dotenv').config();
const express=require('express');
const connectDB=require('./db/db.connect');
const path=require('path');
const profileRouter=require('./src/routes/user.rotes.js');
const AdminRouter=require('./src/routes/admin.routes.js')
const cors=require('cors');
const app=express();

connectDB();

const allowedOrigins = (process.env.ORIGIN || '')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, '')) // strip trailing slash
    .filter(Boolean);

const coreOptions = {
    origin: (origin, callback) => {
        // allow non-browser requests (curl, server-to-server, etc.)
        if (!origin) return callback(null, true);

        const normalized = origin.replace(/\/$/, '');

        const isAllowed =
            allowedOrigins.includes(normalized) ||
            /^https:\/\/matchmaking-frontend-[a-z0-9]+-sarwar2\.vercel\.app$/.test(normalized);

        if (isAllowed) return callback(null, true);
        return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
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
