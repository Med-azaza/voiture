import path from 'path'
import  express from 'express'
import  dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import voitureRoutes from "./routes/voitureRoutes.js"
import {notFound,errorHandler } from './middelware/errorMiddelware.js'
import userRoutes from './routes/userRoutes.js'



dotenv.config()

const app=express()

if (process.env.NODE_ENV==="development"){
    app.use(morgan('dev'))
}
connectDB()


app.get('/',(req, res)=> {
    res.send('API is running...')
})
app.use(express.json())

app.use('/api/voitures',voitureRoutes)
app.use(express.json());
app.use('/api/users', userRoutes)

app.use(notFound)

app.use(errorHandler)

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
const PORT=process.env.PORT || 5000
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV}  on port ${PORT}`.yellow.bold))

console.log(`my host is ${process.env.DB_HOST}`)






























