const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, Collection, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(express.json());
app.use(cors())



const uri = "mongodb+srv://omayer:mx8iqTtgwCPVB4N1@cluster0.ussu9py.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const districtCollection = client.db('LifeFlowDB').collection('district')
    const upazilaCollection = client.db('LifeFlowDB').collection('upazila')
    const userCollection = client.db('LifeFlowDB').collection('user')

    // Users

    app.post('/users', async (req, res) => {
      const data = req.body;
      const result = await userCollection.insertOne(data);
      res.send(result)
    })

    app.get('/users', async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result)
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId (id)};
      const result = await userCollection.findOne(query);
      res.send(result)
    })

    app.delete('/users/:id' , async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })




    // District Data
    app.get('/district', async (req, res) => {
        const result = await districtCollection.find().toArray();
        res.send(result)
    })

    // upazila Data
    app.get('/upazila', async (req, res) => {
        const result = await upazilaCollection.find().toArray();
        res.send(result)
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})