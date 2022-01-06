const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: ["http://localhost:3000"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
});
app.use(express.static("public"));

app.get("/chat", (req, res)=>{
    res.sendFile(__dirname + "/client_chat/public/index.html");
})

let canaux = [];
let users = [];
io.on("connection", (socket)=>{
    socket.on("join",(channel, user)=>{
        canaux.push(channel)
        users.push({
            id : socket.id,
            canal : channel,
            client : user
        })
        let chan = users.find(element => element.id == socket.id)
        socket.join(chan.canal);
        let canaux_unique = [...new Set(canaux)];
        io.emit("joined", channel, user) 
        io.emit("canaux", canaux_unique)
        console.log(socket.rooms);
        


        socket.on("send", function ( msg, id ){
            let now = new Date()
            io.to(chan.canal).emit('message', {pseudo : chan.client, text : msg, date: now })
        })
        socket.on('disconnect', ()=>{
            canaux.splice(canaux.indexOf(socket.id),1)
            io.emit("canaux", canaux)
        })

    })

})

http.listen(5000, ()=>{
    // console.log(__dirname);

})