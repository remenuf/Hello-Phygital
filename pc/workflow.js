const machine = Ubox.setMachine({
  initialState: "welcome",
  paths: {
    welcome: { next: "chat" },
    chat: { back: "welcome" },
  },
});

Ubox.Event.registerEntry("chat", () => {
  document.getElementById("welcome").classList.add("header");
  document.getElementById("chat").style.display = "block";
});
Ubox.Event.registerExit("chat", () => {
  document.getElementById("welcome").classList.remove("header");
  document.getElementById("chat").style.display = "none";
});

machine.init();

const mobileLink = "https://studio.ubox.world/";
const qrContainer = document.getElementById("qr-code");

const qrcode = new QRCodeStyling({
  type: "svg",
  data: mobileLink,
  dotsOptions: {
    type: "classy",
    gradient: {
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#00abef" },
        { offset: 1, color: "#0054ac" },
      ],
    },
  },
  cornersSquareOptions: {
    type: "extra-rounded",
  },
  cornersDotOptions: {
    type: "dot",
  },
});

qrcode.append(qrContainer);

qrContainer.addEventListener("click", () => {
  if (machine.state == "chat") machine.newState("back");
});
