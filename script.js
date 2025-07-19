const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", () => {
  console.log("Connected to websocket server");
});

const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", () => {
  const message = messageInput.value.trim();

  if (message !== "") {
    socket.send(message);
    messageInput.value = "";

    const messageElement = document.createElement("div");
    messageElement.className = "mb-2 p-2 bg-primary text-white rounded";
    messageElement.textContent = `You: ${message}`;

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    messageInput.value = "";
  }
});


socket.addEventListener('message', async(event)=>{
    const message = await event.data.text();
    const replyElement = document.createElement("div");
    replyElement.className = "mb-2 p-2 bg-secondary text-white rounded text-end w-100";
    replyElement.textContent = `Stranger: ${message}`;

    chatBox.appendChild(replyElement);
    chatBox.scrollTop = chatBox.scrollHeight
})

