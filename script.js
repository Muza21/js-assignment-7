// H/A #7

// 1) In the center of the page there is a button that says Click me! When you hover over it with a 50% probability, it disappears and appears in a random place. When clicked, it does the same with 100% probability.

const changeButtonPosition = () => {
    const top = Math.floor(Math.random()*90);
    const left = Math.floor(Math.random()*90);
    randomButton.style.top = `${top}%`;
    randomButton.style.left = `${left}%`;
    randomButton.style.transform = 'none';
}

const randomButton = document.querySelector('.random-button');
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

const updateStopwatch = () => {
    const currentTime = Date.now();
    elapsedTime = currentTime - stopwatchStartTime;

    let hours = Math.floor(elapsedTime / (1000*60*60));
    let minutes = Math.floor(elapsedTime / (1000*60)%60);
    let seconds = Math.floor(elapsedTime / 1000%60);

    hours = String(hours).padStart(2,'0');
    minutes = String(minutes).padStart(2,'0');
    seconds = String(seconds).padStart(2,'0');

    stopwatch.textContent = `${hours}:${minutes}:${seconds}`
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

let timerStartTime;
let timerInterval;

const timer = document.querySelector('.timer .time');

const timerStartButton = document.querySelector('.time-button.start');
const timerStopButton = document.querySelector('.time-button.stop');
const timerResetButton = document.querySelector('.time-button.reset');
