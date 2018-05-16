const express= require('express')
const path=require('path')

const app = express()




app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

  
app.use(function (req, res, next) {

// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

// Pass to next layer of middleware
next();
}); 
 

var port = Number(process.env.PORT || 2020);

app.use("/", express.static(path.join(__dirname, "public")));
app.use('/',require('./routes/api').route)
app.use('/', (req,res)=>{
  res.redirect('notFound.html')  
})
var server = app.listen(port, () => {
  console.log("Server is running at http://localhost:" + port);
})
