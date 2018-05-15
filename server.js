const express= require('express')
const path=require('path')

const app = express()


app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

var port = Number(process.env.PORT || 2020);

app.use("/", express.static(path.join(__dirname, "public")));
app.use('/',require('./routes/api').route)
app.use('/', (req,res)=>{
  res.redirect('notFound.html')  
})
var server = app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
})
