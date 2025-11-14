require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');
const http = require("http");
const initSocket = require("./src/socket/socket");

connectDB();
const server = http.createServer(app);
initSocket(server);

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
})