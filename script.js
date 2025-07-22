let type_content = document.querySelector('.type_content p');

let input = document.getElementById('typeValue');

let letterIndex = 0;
let mistakes = 0;
let isTyping = false;

let soundOn = true;
let soundBtn = document.querySelector('.sound input');
let resetBtn = document.querySelector('.bottom_part button');
let time;
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxTime = 200;
let timeleft = maxTime;

let correctType=new Audio('type.mp3');
correctType.playbackRate = 1.5;
let incorrectType=new Audio('wrong.mp3');
incorrectType.playbackRate = 2.0;

const playSound = () =>{
    correctType.pause();
    incorrectType.pause();
}

soundBtn.addEventListener('click', ()=>{
     soundOn = !soundOn; // toggle

    if(soundOn){
        soundBtn.parentElement.querySelector('span').innerText = "Key Sound ON/OFF";
    }else{
        soundBtn.parentElement.querySelector('span').innerText = "Key Sound ON/OFF";
    }
})

const loadPara = () => {
    let random_Para = Math.floor(Math.random() * article.length);
    type_content.innerHTML = "";
    article[random_Para].split('').forEach(element =>{
        let realData = `<span>${element}</span>`;
        type_content.innerHTML += realData;
    });

    type_content.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('click', ()=>{
        input.focus();
    })

    type_content.addEventListener('click', ()=>{
        input.focus();
    })
}

loadPara();


/*input.addEventListener('input', (e)=>{
    let char = type_content.querySelectorAll('span');
    let inputValue = e.target.value.split('')[letterIndex];
    
    if(!isTyping){
        time  = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if(letterIndex < char.length - 1){
        if(inputValue==null){
            if(letterIndex > 0){
                letterIndex--;
                if(char[letterIndex].classList.contains('incorrect')){
                    mistakes--;
                }
                char[letterIndex].classList.remove('correct','incorrect');
            }
        }else{
        if(char[letterIndex].innerText == inputValue){
            char[letterIndex].classList.add('correct');
            if(soundOn){
                playSound();
                correctType.play();
            }
        }else{
            char[letterIndex].classList.add('incorrect');
            mistakes++;
            if(soundOn){
                playSound();
                incorrectType.play();
            }
        }
    }

    letterIndex++;
    char.forEach(element =>{
        element.classList.remove('active');
    })
    char[letterIndex].classList.add('active');
    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : ${letterIndex - mistakes}`;
}else{
    clearInterval(time);
    input.value = "";
}
});*/

input.addEventListener('input', (e) => {
    let char = type_content.querySelectorAll('span');
    let inputValue = e.target.value.split('');

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    // Reset all classes first
    char.forEach(c => c.classList.remove('correct', 'incorrect', 'active'));

    // Recalculate everything based on input.value
    mistakes = 0;
    //letterIndex = inputValue.length;

    inputValue.forEach((ch, idx) => {
        if (char[idx].innerText === ch) {
            char[idx].classList.add('correct');
            if(soundOn){
                playSound();
                correctType.play();
            }
        } else {
            char[idx].classList.add('incorrect');
            mistakes++;
            if(soundOn){
                playSound();
                incorrectType.play();
            }
        }
    });

    // Add active class to current position
    if (inputValue.length < char.length) {
        char[inputValue.length].classList.add('active');
    }

    // Update stats
    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : ${inputValue.length - mistakes}`;

    // If completed
    if (inputValue.length === char.length) {
        clearInterval(time);
        input.value = "";
    }
});


input.addEventListener('keydown', (e) => {
    if (e.key === "Backspace") {
        e.preventDefault();

        let char = type_content.querySelectorAll('span');

        if (input.value.length > 0) {
            // Remove highlight from current char
            char[input.value.length].classList.remove('active');
        }

        // Highlight the previous char as active
        if (input.value.length - 1 >= 0) {
            char[input.value.length - 1].classList.add('active');
        }
    }
});



const timeSetup = () =>{
    if(timeleft > 0){
        timeleft--;
        t_left.innerText = `Time-Left : ${timeleft}s`;
        let wpmTab = Math.round((letterIndex - mistakes)/ 5/ (maxTime - timeleft) * 60);
        wpm.innerText = `WPM : ${wpmTab}`;
    }else{
        clearInterval(time);
        input.value = "";
    }
};

resetBtn.addEventListener('click', ()=>{
    loadPara();
    clearInterval(time);
    wpm.innerText = `WPM : `;
    error.innerText = `Mistakes : `;
    cpm.innerText = `CPM : `;
    timeleft = maxTime;
    t_left.innerText = `Time-Left : ${maxTime}s`;
    input.value = "";
    letterIndex = 0;
    mistakes = 0;
    isTyping = false;
})