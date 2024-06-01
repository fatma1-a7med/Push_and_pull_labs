let username = prompt("Please enter your name");
console.log(username);

var title_h = document.getElementById('title');
title_h.innerHTML = `Hello ${username}`;

var chatbox = document.getElementById('chatbox');
var msg_input = document.getElementById('msg');
var send_btn = document.getElementById('send');
var clear_btn = document.getElementById('clear_chat');
var online_div = document.getElementById('onlineusers');

let mywebsocket = new WebSocket('ws://localhost:8090');

console.log(mywebsocket);

mywebsocket.onopen = function () {
    console.log('connection opened', this);
    let message_obj = {
        username: username,
        login: true
    };
    this.send(JSON.stringify(message_obj));
};

mywebsocket.onmessage = function (event) {
    console.log(event.data);
    let msg_content = JSON.parse(event.data);
    if (msg_content.type === 'login') {
        chatbox.innerHTML += `<h3 class="text-center text-success"> ${msg_content.message} </h3>`;
    } else if (msg_content.type === 'logout') {
        chatbox.innerHTML += `<h3 class="text-center text-danger"> ${msg_content.message} </h3>`;
    } else if (msg_content.type === 'chat') {
        chatbox.innerHTML += `<h4 class="w-50 bg-success rounded-2 text-wrap text-light p-2 mx-2"> ${msg_content.message} </h4>`;
    }

    online_div.innerHTML = '';
    msg_content.online.forEach((element) => {
        online_div.innerHTML += `<li class="list-group-item"><span class="rounded-circle p-1 bg-success" style='width:10px; height:10px; display:inline-block; margin-right:10px'></span>${element}</li>`;
    });
};

mywebsocket.onerror = function () {
    chatbox.innerHTML += '<h3 style="color: red">Error connecting to server </h3>';
};

send_btn.addEventListener('click', function () {
    let msg_val = msg_input.value;
    let message_obj = {
        body: `${username}:${msg_val}`
    };
    mywebsocket.send(JSON.stringify(message_obj));
    //chatbox.innerHTML += `<h4 class="ms-auto w-50 bg-primary text-wrap rounded-2 text-light p-2 mx-2">Me: ${msg_val} </h4>`;
    msg_input.value = '';
});

clear_btn.addEventListener('click', function () {
    chatbox.innerHTML = '';
});

mywebsocket.onclose = function () {
    console.log('Connection closed');
};
