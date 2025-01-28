function newMsg(user, userColor, text) {
  const box = document.createElement("div");
  box.classList.add("message-box");

  const avatar = document.createElement("span");
  avatar.classList.add("avatar");
  avatar.style.backgroundColor = userColor;
  box.appendChild(avatar);

  const username = document.createElement("p");
  username.classList.add("username");
  username.textContent = "user nº " + user;
  box.appendChild(username);

  const message = document.createElement("p");
  message.classList.add("message");
  message.textContent = text;
  box.appendChild(message);

  const chatbox = document.getElementById("chat");
  scrollPosition();
  chatbox.querySelector("#chat-container").appendChild(box);
  if (chatbox.scrollValue) scrollToBottom();
}

function scrollPosition() {
  const chatbox = document.getElementById("chat");
  chatbox.scrollValue =
    chatbox.scrollTop + chatbox.clientHeight + 1 >= chatbox.scrollHeight;
}

function scrollToBottom() {
  const container = document.getElementById("chat");
  container.scrollTop = container.scrollHeight;
}

window.addEventListener("resize", scrollToBottom);
