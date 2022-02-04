const express = require('express');
const app = express();
const http = require('http').createServer(app); // create server

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})