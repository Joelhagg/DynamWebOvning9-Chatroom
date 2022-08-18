const socket = io();

const messageContainer = document.getElementById("messageContainer");
const roomContainer = document.getElementById("roomContainer");
const messageForm = document.getElementById("sendContainer");
const messageInput = document.getElementById("messageInput");

if (messageForm != null) {
  const name = prompt("Vad heter du?");
  appendMessage(`Du joinade kanalen "${roomName}"`);
  appendMessage(`Som användare "${name}"`);

  socket.emit("newUser", roomName, name);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`Du: ${message}`);
    socket.emit("sendChatMessage", roomName, message);
    messageInput.value = "";
  });
}

socket.on("chatMessage", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("roomCreated", (room) => {
  const roomLink = document.createElement("a");
  roomLink.href = `/${room}`;
  roomLink.innerText = `${room}`;
  roomContainer.append(roomLink);
});

socket.on("userConnected", (name) => {
  appendMessage(`${name} joinade`);
});

socket.on("userDisconnected", (name) => {
  appendMessage(`${name} hoppade ur chatten!!!`);
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
