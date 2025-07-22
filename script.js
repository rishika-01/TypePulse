let type_content = document.querySelector('.type_content p');

let input = document.getElementById('typeValue');

let letterIndex = 0;
let mistakes = 0;
let isTyping = false;

let resetBtn = document.querySelector('.bottom_part button');
let time;
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxTime = 60;
let timeleft = maxTime;

let correctType=new Audio('type.mp3');
let incorrectType=new Audio('wrong.mp3');

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

input.addEventListener('input', (e)=>{
    let char = type_content.querySelectorAll('span');
    let inputValue = e.target.value.split('')[letterIndex];
    
    if(!isTyping){
        time  = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if(letterIndex < char.length - 1){
        if(inputValue==null){
            console.log(`opps`);
        }else{
        if(char[letterIndex].innerText == inputValue){
            char[letterIndex].classList.add('correct');
            correctType.play();
        }else{
            char[letterIndex].classList.add('incorrect');
            mistakes++;
            incorrectType.play();
        }
    }

    letterIndex++;
    char.forEach(element =>{
        element.classList.remove('active');
    })
    char[letterIndex].classList.add('active');
    error.innerText = `Mistakes : ${mistakes}`;
    cpm.innerText = `CPM : ${letterIndex - mistakes}`;
}
});

const timeSetup = () =>{
    if(timeleft > 0){
        timeleft--;
        t_left.innerText = `Time-Left : ${timeleft}s`;
        let wpmTab = Math.round((letterIndex - mistakes)/ 5/ (maxTime - timeleft) * 60);
        wpm.innerText = `WPM : ${wpmTab}`;
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
    let letterIndex = 0;
    let mistakes = 0;
    let isTyping = false;
})