const express = require('express');
const { Client } = require('cassandra-driver');
const cassandra = require('cassandra-driver');
const app = express();
const port = 3001; // Set your desired port number
const cors = require('cors');
app.use(cors())
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))


// Configure your AstraDB credentials
const credentials = {
  clientId: 'nUrFHReLtAPiAngrwAUvnzGH',
  secret: 'qLuL2Ub9UsJw7NW27obUCTAHI8_-Dr5_IH+X+XRSExALQCMaIT08NEztIub4Yh_OM4ETgyKIEDlbs943a.YZXks6rW--AbYA3DJq.ihPjuZgt6DXglZjbK90UWWBGYmF',
  secureConnectBundle: 'secure-connect-filsufid.zip',
};

// Create a Cassandra client
const client = new Client({
  cloud: {
    secureConnectBundle: credentials.secureConnectBundle,
  },
  credentials: {
    username: credentials.clientId,
    password: credentials.secret,
  },
});

// Connect to the AstraDB cluster
client.connect()
  .then(() => {
    console.log('Connected to AstraDB cluster');
  })
  .catch((error) => {
    console.error('Error connecting to AstraDB:', error);
  });

// Login User
app.post('/api/loginuser', async (req, res) => {
  try {
    const username = 'Radhofan'; 
    const password = '123';
    const query = 'SELECT id_user FROM filsuf_id.users_data WHERE "username" = ? AND "password" = ?';
    const params = [username, password]
    const result = await client.execute(query, params, { prepare: true });
    //res.json(result.rows);
    if(result.rows.length > 0){
        res.json(result);
    } else {
        res.json(false);
    }
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data.' });
  }
});

// Register User
app.post('/api/registeruser', async (req, res) => {
    try {
      const username = req.body.username;
      const password = req.body.password;
      const email = req.body.email;
      const id_user = cassandra.types.Uuid.random(); 
  
      // Check if the username already exists
      const checkQuery = 'SELECT * FROM filsuf_id.users_data WHERE "username" = ? AND "email" = ?';
      const checkParams = [username, email];
      const checkResult = await client.execute(checkQuery, checkParams, { prepare: true });
  
      if (checkResult.rows.length > 0) {
        // Username already exists, send an error response 
        res.json(false);
      } else {
        // Execute an INSERT query to insert data into your table
        const insertQuery = 'INSERT INTO filsuf_id.users_data ("id_user", "email", "password", "username") VALUES (?, ?, ?, ?)';
        const insertParams = [id_user, email, password, username];
        const insertResult = await client.execute(insertQuery, insertParams, { prepare: true });
  
        // Check if the insertion was successful
        if (insertResult) {
          // If successful, return a success response
          res.json(true);
        } else {
          // If not successful, return an error response
          res.status(500).json({ error: 'Failed to register user.' });
        } 
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Failed to register user.' });
    }
  });

//Get Example post for front page
app.get('/api/examplepost', async (req, res) => {
  try{
    const query = 'SELECT * FROM filsuf_id.post;'
    const result =  await client.execute(query, { prepare: true });
    res.send(result)
  } catch (error){
      console.error('Error getting posts:', error);
      res.status(500).json({ error: 'Failed getting posts.' });
  }
})

//Get All Articles
app.get('/api/getarticles', async (req,res) => {
  try{
    const query = 'SELECT * FROM filsuf_id.articles;'
    const result =  await client.execute(query, { prepare: true });
    
    res.send(result)
  } catch (error){
    console.error('Error getting posts:', error);
    res.status(500).json({ error: 'Failed getting posts.' });
  }
})

app.post('/api/createpost', async (req,res) => {
  try{
    const id_post = cassandra.types.Uuid.random();
    const user_id = req.body.userid;
    const username = req.body.username;
    const title = req.body.title;
    const desc = req.body.desc;
    const image_url = req.body.imageUrl;
    const tags = req.body.tags;
    const votes = req.body.votes;
    const comments = [];

    const insertQuery = 'INSERT INTO filsuf_id.post ("post_id", "username" , "user_id", "title", "description", "image_cdn_url", "tags", "timestamp", "votes", "comment_ids") VALUES (?, ?, ?, ?, ?, ?, ?, toTimestamp(now()), ?, ?)';
    const insertParams = [id_post, username, user_id, title, desc, image_url, tags, votes, comments];
    const insertResult = await client.execute(insertQuery, insertParams, { prepare: true });

    if (insertResult) {
      res.json(true);
    } else {
      res.status(500).json({ error: 'Failed to upload post.' });
    } 

  } catch(error){
    console.error('Error uploading posts:', error);
    res.status(500).json({ error: 'Failed uploading posts.' });
  }
})

app.post('/api/createarticle', async (req,res) => {
  try{
    const id_post = cassandra.types.Uuid.random();
    const user_id = req.body.userid;
    const username = req.body.username;
    const title = req.body.title;
    const desc = req.body.desc;
    const image_url = req.body.imageUrl;
    const tags = req.body.tags;
    const votes = req.body.votes;
    const comments = [];

    const insertQuery = 'INSERT INTO filsuf_id.articles ("post_id", "user_id", "username" ,"title", "description", "image_cdn_url", "tags", "timestamp", "votes", "comment_ids") VALUES (?, ?, ?, ?, ?, ?, ?, toTimestamp(now()), ?, ?)';
    const insertParams = [id_post, user_id, username, title, desc, image_url, tags, votes, comments];
    const insertResult = await client.execute(insertQuery, insertParams, { prepare: true });

    if (insertResult) {
      res.json(true);
    } else {
      res.status(500).json({ error: 'Failed to upload post.' });
    } 

  } catch(error){
    console.error('Error uploading posts:', error);
    res.status(500).json({ error: 'Failed uploading posts.' }); 
  }
})

//find comments
app.post('/api/findcomments', async (req,res) => {
  try{
    const post_id = req.body.post_id;

    const insertQuery = 'SELECT * FROM filsuf_Id.comments_data WHERE post_id = ?';
    const insertParams = [post_id];
    const insertResult = await client.execute(insertQuery, insertParams, { prepare: true });

    if (insertResult) {
      res.json(insertResult); 
    } else {
      res.status(500).json({ error: 'Failed to upload post.' });
    } 

  } catch(error){
    console.error('Error uploading posts:', error);
    res.status(500).json({ error: 'Failed uploading posts.' });
  }
})

//get books
app.get('/api/getbooks', async (req,res) => {
  try{

    const insertQuery = 'SELECT * FROM filsuf_Id.books';
    const insertResult = await client.execute(insertQuery, null, { prepare: true });

    if (insertResult) {
      res.json(insertResult); 
    } else {
      res.status(500).json({ error: 'Failed to upload post.' });
    } 
 
  } catch(error){
    console.error('Error uploading posts:', error);
    res.status(500).json({ error: 'Failed uploading posts.' });
  }
})

//get books
app.post('/api/postcomment', async (req, res) => {
  try {
    const comment_id = cassandra.types.Uuid.random(); 
    const user_id = req.body.id;
    const username = req.body.username;
    const post_id = req.body.post_id;
    const description = req.body.description;

    const insertQuery = 'INSERT INTO filsuf_id.comments_data (comment_id, post_id, user_id, description, timestamp, votes, username) VALUES (?, ?, ?, ?, totimestamp(now()), 0, ?)';
    const insertParams = [comment_id, post_id, user_id, description, username];
    const insertResult = await client.execute(insertQuery, insertParams, { prepare: true });

    if (insertResult) {
      res.json(insertResult);
    } else {
      res.status(500).json({ error: 'Failed to upload comment.' });
    }
  } catch (error) {
    console.error('Error uploading comments:', error);
    res.status(500).json({ error: 'Failed uploading comments.' });
  }
});






// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
