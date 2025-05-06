const webcam = document.getElementById("webcam");
const overlay = document.getElementById("overlay");
const ctx = overlay.getContext("2d");
const logList = document.getElementById("log-list");
const loader = document.getElementById("loader");
const appContainer = document.querySelector(".app-container");

async function initCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcam.srcObject = stream;

    webcam.onloadedmetadata = () => {
      overlay.width = webcam.videoWidth;
      overlay.height = webcam.videoHeight;
      loader.classList.add("hidden");
      appContainer.classList.remove("hidden");

      startTracking(); 
    };
  } catch (e) {
    loader.textContent = "Error accessing camera.";
    console.error("Camera error:", e);
  }
}

function logGesture(gesture) {
  const li = document.createElement("li");
  const timestamp = new Date().toLocaleTimeString();
  li.textContent = `[${timestamp}] ${gesture}`;
  logList.prepend(li);
}

function drawDummyHand() {
  ctx.clearRect(0, 0, overlay.width, overlay.height);
  ctx.beginPath();
  ctx.arc(overlay.width / 2, overlay.height / 2, 50, 0, 2 * Math.PI);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.stroke();
}

function startTracking() {
  setInterval(() => {
    drawDummyHand();
    const gestures = ["Hello", "Yes", "No", "Thanks", "Love"];
    const gesture = gestures[Math.floor(Math.random() * gestures.length)];
    logGesture(gesture);
  }, 3000);
}

initCamera();
