const express= require('express')
const path=require('path')

const app = express()


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))



app.use('/',require('./routes/api').route)

app.listen(2020,()=> console.log("connected to http://localhost:2020"))
