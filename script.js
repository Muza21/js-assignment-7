// H/A #7

// 1) In the center of the page there is a button that says Click me! When you hover over it with a 50% probability, it disappears and appears in a random place. When clicked, it does the same with 100% probability.

const changeButtonPosition = () => {
    const top = Math.floor(Math.random()*100);
    const left = Math.floor(Math.random()*100);
    randomButton.style.top = `${top}%`;
    randomButton.style.left = `${left}%`;
    randomButton.style.transform = 'none';
}

const randomButton = document.querySelector('.random-button');
randomButton.addEventListener('mouseover',()=>{
    const chance = Math.floor(Math.random()*10);
    if(chance>5){
        changeButtonPosition();
    }
});

randomButton.addEventListener('click', changeButtonPosition);

// 2) The page consists of two halves: a stopwatch and a timer. The functionality is appropriate, you can receive data for the timer simply by text input, or you can use buttons like “+1m.”. Accurate down to seconds.