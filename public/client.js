const { append } = require("express/lib/response");

const socket=io()

// Prompt box
let name;
do {
    name = prompt("Please enter your name: ")
}while(!name)

let textarea = document.querySelector('#textarea');

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message: message.trim()
    }

    //Append message in the message are
    appendMessage(msg,'outgoing')
    textarea.value="";
    scrollToBottom();

    //send to server through socket
    socket.emit('message',msg)
}

let messageArea = document.querySelector('.message__area')
function appendMessage(msg, type){
    //creating the message box
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className,'message');

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    //passing the message into the created div
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

//Recieve Messages
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}