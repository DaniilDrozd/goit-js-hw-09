
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let intervalId = null;


  btnStart.addEventListener('click',StartSwColor);
  btnStop.addEventListener('click',StopSwColor);

  function StartSwColor(){
    btnStart.disabled = true;
    btnStop.disabled = false;
    intervalId = setInterval( changeColor,1000);
}

function changeColor() {
    bodyColor.style.backgroundColor = getRandomHexColor();
  }

  function StopSwColor() {
    btnStart.disabled = false;
    btnStop.disabled = true;
  
    clearInterval(intervalId);
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }