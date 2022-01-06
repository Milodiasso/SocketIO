const socket = io();

var send = () => {
    let msg = document.getElementById("msg").value;
    socket.emit("chat message", msg)
    document.getElementById('msg').value= ''

}

var receive = function (msg) {
    var li = document.createElement("li")
    li.innerText = msg
    document.getElementById("messages").appendChild(li)
}
var btn = document.getElementById('btn-send')
btn.addEventListener('click',send);
socket.on("chat message", receive)