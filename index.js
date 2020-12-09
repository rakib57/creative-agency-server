const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const e = require('express');
const MongoClient = require('mongodb').MongoClient;


const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('service'));
app.use(fileUpload());


const uri = "mongodb+srv://assignment11:nipun006@cluster0.aea4t.mongodb.net/creativeAgency?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });

client.connect(err => {
  const serviceCollection = client.db("creativeAgency").collection("addServices");
  const orderCollection = client.db("creativeAgency").collection("orderPlace");
  console.log(' yah connected')

  
  app.post('/addService', (req, res) => {
    const file = req.files.file;
    const title = req.body.title;
    const description = req.body.description;
    console.log(file, title, description)
    file.mv(`${__dirname}/sercice/${file.name}`, err =>{
        if(err){
            console.log(err)
           return res.status(500).send({mgs:'Failed to upload image'})
        }
          return res.send({name: file.name, path:`/${file.name}`})
    })
  })



  app.post('/orderPlace', (req, res) =>{
    const file = req.files.file;
    const name = req.body.name;
    const email = req.body.email;
    const selectedServiceName = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const serviceId = req.body.serviceId;
    const status = req.body.status;
    console.log(file, name, email, description, price, serviceId, status)
    file.mv(`${__dirname}/order/${file.name}`, err =>{
      if(err){
          console.log(err)
         return res.status(500).send({mgs:'Failed to upload image'})
      }
        return res.send({name: file.name, path:`/${file.name}`})
  })
  })


});

app.get('/', (req,res) => {
    res.send('Please mongodb work safely. Please...')
})

app.listen(5000)