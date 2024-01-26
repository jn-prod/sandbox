const http = require('http');
const https = require('https');
const Koa = require('koa');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const router = require('./router')

async function run() {
    const app = new Koa();

    // Open db connection
    let client;
    let db;
    try {
        client = await MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true });
        db = client.db();
        console.log('[db] - Connexion succeded');
    } catch (err) {
        console.log('[db] - Connexion failed');
        console.error(err)
    }

    app.use(cors());
    
    // body parser
    app.use(bodyParser());
    
    // apply routes
    app.use(router(db));

    
    // connect to port
    http.createServer(app.callback()).listen(3000);
    https.createServer(app.callback()).listen(3001); 
}

module.exports = { run }