// Ubox Events
const context = null;
const next = () => {};
const prior = () => {};
const grip = () => {};
const release = () => {};
const noUser = () => {};
const newUser = () => {};
const changeHandNone = () => {};
const changeHandRight = () => {};
const changeHandLeft = () => {};
const msgFromArduino = (value) => {};
const opmsg = (msg) => {};
const stdmsg = (msg) => {};
const cstmsg = (msg) => {};

let ubox;
try {
  ubox = UboxClient.getInstance();
  ubox.error((data) => console.error(data));

  ubox.customEventReceived((data) => {
    if (data.command != "message") return;
    newMsg(data.id, data.color, data.text);
  });
} catch (error) {
  console.error(error);
}
