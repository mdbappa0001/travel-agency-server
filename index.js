const express = require("express")
const app = express();
const port = process.env.PORT || 5000
const cors = require("cors")
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3bzrn0l.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        
        const toursCollection = client.db('techokids').collection('tours');
        const bookingCollection = client.db('techokids').collection('bookings');


        app.get('/tour', async(req, res) => {
            const query = {};
            const cursor = toursCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

      app.post('/booking', async(req,res) =>{
        const booking = req.body;
        const result = await bookingCollection.insertOne(booking);
        res.send(result);
      })



    }
    finally{

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from travel agency')
})

app.listen(port, () =>{
    console.log(`Travel agency listening on port ${port}`)
})