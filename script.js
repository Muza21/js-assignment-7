// H/A #7

// 1) In the center of the page there is a button that says Click me! When you hover over it with a 50% probability, it disappears and appears in a random place. When clicked, it does the same with 100% probability.

const randomButton = document.querySelector('.random-button');

const changeButtonPosition = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = randomButton.clientWidth;
    const buttonHeight = randomButton.clientHeight;
    
    const maxTop = Math.floor(100 - (buttonHeight / screenHeight) * 100);
    const maxLeft = Math.floor(100 - (buttonWidth / screenWidth) * 100);

    const top = Math.floor(Math.random()*maxTop);
    const left = Math.floor(Math.random()*maxLeft);

    randomButton.style.top = `${top}%`;
    randomButton.style.left = `${left}%`;
    randomButton.style.transform = 'none';
}

randomButton.addEventListener('mouseover',()=>{
    if(Math.random()>0.5){
        changeButtonPosition();
    }
});

randomButton.addEventListener('click', changeButtonPosition);

// 2) The page consists of two halves: a stopwatch and a timer. The functionality is appropriate, you can receive data for the timer simply by text input, or you can use buttons like “+1m.”. Accurate down to seconds.

let stopwatchStartTime;
let stopwatchInterval;
let elapsedTime = 0;
let stopwatchIsRunning = false;

const stopwatch = document.querySelector('.stopwatch .time');

const stopwatchStartButton = document.querySelector('.stopwatch-button.start');
const stopwatchStopButton = document.querySelector('.stopwatch-button.stop');
const stopwatchResetButton = document.querySelector('.stopwatch-button.reset');

const formatTime = (milliseconds) => {
    let hours = String(Math.floor(milliseconds / (1000*60*60))).padStart(2,'0');
    let minutes = String(Math.floor(milliseconds / (1000*60)%60)).padStart(2,'0');
    let seconds = String(Math.floor(milliseconds / 1000%60)).padStart(2,'0');
    return `${hours}:${minutes}:${seconds}`;
}

const displayTime = (element, time) => {

    element.textContent = formatTime(time);
}

const updateStopwatch = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - stopwatchStartTime;
    displayTime(stopwatch, elapsedTime);
}

const startStopwatch = () => {
    if(!stopwatchIsRunning){
        stopwatchStartTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch,1000);
        stopwatchIsRunning = true;
    }
}

const stopStopwatch = () => {
    if(stopwatchIsRunning){
        clearInterval(stopwatchInterval);
        elapsedTime = Date.now() - stopwatchStartTime;
        stopwatchIsRunning = false;
    }
}

const resetStopwatch = () => {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    stopwatchStartTime = 0;
    stopwatchIsRunning = false;
    stopwatch.textContent = '00:00:00';
}

stopwatchStartButton.addEventListener('click', startStopwatch);
stopwatchStopButton.addEventListener('click', stopStopwatch);
stopwatchResetButton.addEventListener('click',resetStopwatch);

const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;
let timerStartTime = 0;
let timerInterval;
let timerIsRunning = false;

const timer = document.querySelector('.timer .time');

const timerStartButton = document.querySelector('.time-button.start');
const timerStopButton = document.querySelector('.time-button.stop');
const timerResetButton = document.querySelector('.time-button.reset');

const timerAddButton = document.querySelector('.time-button.add');
const timerSubtractButton = document.querySelector('.time-button.substract');

const updateTimer = () => {
    if(timerIsRunning && timerStartTime > 0){
        timerStartTime-=1000;
    }

    if(timerStartTime <= 0){
        clearInterval(timerInterval);
        timerStartTime = 0;
        timerIsRunning = false;
    }

    displayTime(timer,timerStartTime);
}

const startTimer = () => {
    if(!timerIsRunning){
        timerInterval = setInterval(updateTimer,1000);
        timerIsRunning = true;
    }
}

const stopTimer = () => {
    if(timerIsRunning){
        clearInterval(timerInterval);
        timerIsRunning = false;
    }
}

const resetTimer = () => {
    clearInterval(timerInterval);
    timerStartTime = 0;
    timerIsRunning = false;
    timer.textContent = '00:00:00';
}

const addTime = () => {
    timerStartTime+=ONE_MINUTE_IN_MILLISECONDS
    updateTimer();
}
const subtractTime = () => {
    if(timerStartTime-ONE_MINUTE_IN_MILLISECONDS >= 0) {
        timerStartTime -= ONE_MINUTE_IN_MILLISECONDS
    }
    updateTimer();
}

timerAddButton.addEventListener('click',addTime);
timerSubtractButton.addEventListener('click',subtractTime);

timerStartButton.addEventListener('click',startTimer);
timerStopButton.addEventListener('click',stopTimer);
timerResetButton.addEventListener('click',resetTimer);