// Messages

function newUserMsg(userColor, text) {
  const box = document.createElement("div");
  box.classList.add("message-box");
  box.classList.add("user");

  const username = document.createElement("p");
  username.classList.add("username");
  username.textContent = `You (${userID})`;
  box.appendChild(username);

  const message = document.createElement("p");
  message.classList.add("message");
  message.textContent = text;
  box.appendChild(message);

  const avatar = document.createElement("span");
  avatar.classList.add("avatar");
  avatar.style.backgroundColor = userColor;
  box.appendChild(avatar);

  const chatbox = document.getElementById("chat");
  scrollPosition();
  chatbox.querySelector("#chat-container").appendChild(box);
  if (chatbox.scrollValue) scrollToBottom();
}

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

function submitMsg() {
  const text = document.getElementById("message").textContent;
  if (!text) return;

  const color = getComputedStyle(
    document.querySelector(".selected")
  ).backgroundColor;

  const msg = {
    command: "message",
    id: userID,
    text: text,
    color: color,
  };

  try {
    ubox.sendCustomEvent(msg);
    newUserMsg(color, text);
    document.getElementById("message").textContent = "";
  } catch (error) {
    console.error(error);
    newUserMsg("#f03232", "Could not send the message\n" + error);
  }
}

// Scroll Functions

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

const chat = document.getElementById("chat");
const observer = new ResizeObserver(() => {
  if (chat.scrollValue) scrollToBottom();
});
observer.observe(chat);
chat.addEventListener("scroll", scrollPosition);

// User id

const userID = (() => {
  let rng1 = ~~(Math.random() * 89 + 10);
  let rng2 = ~~(Math.random() * 89 + 10);
  let id = rng1.toString() + rng2;
  return Number(id);
})();

// Select user color

const colorContainer = document.getElementById("avatar-picker");

function openSelector() {
  document.getElementById("selection").classList.remove("collapsed");
  colorContainer.removeEventListener("click", openSelector);

  const changeColor = (e) => {
    const colors = document.querySelectorAll("#selection span");
    if (Array.from(colors).includes(e.target)) {
      document.querySelector(".selected")?.classList.remove("selected");
      e.target.classList.add("selected");
    }
    document.getElementById("selection").classList.add("collapsed");
    window.removeEventListener("click", changeColor);
    colorContainer.addEventListener("click", openSelector);
  };

  setTimeout(() => {
    window.addEventListener("click", changeColor);
  }, 100);
}

colorContainer.addEventListener("click", openSelector);
