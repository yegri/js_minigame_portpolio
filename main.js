'use strict';

const CARROT_SIZE = 80; // 당근 사이즈만큼 빼줘야 지정한 field 안에 벌레와 당근이 자리함
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect(); // field의 전체적인 사이즈와 포지션 알기 위해

const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up_message');
const popUpRefresh = document.querySelector('.pop-up_refresh');

const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

// 게임의 상태를 기억하고 있는 변수가 있어야 함
let started = false;
let score = 0;
let timer = undefined;

field.addEventListener('click',(event)=> onFieldClick(event));

gameBtn.addEventListener('click',() => {
    if(started){
        stopGame();
    }else{
        startGame();
    }
    started = !started; //게임이 중지되었으므로 started를 반대로 바꿔주기
});
popUpRefresh.addEventListener('click',() => {
    startGame();
    hidePopUp();
})
function startGame(){
    started = true;
    initGame(); // 버튼을 눌렀을 때 당근, 벌레들을 호출해야 하므로
    showStopButton(); // 버튼 눌렀을 때 stop 버튼 나오게
    showTimerAndScore(); // 버튼 눌렀을 때 타이머, 스코어 나오게
    startGameTimer();
    playSound(bgSound);
}
function stopGame(){
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY?');
    playSound(alertSound);
    stopSound(bgSound);
}
function finishGame(win){
    started = false;
    hideGameButton();
    if(win){
        playSound(winSound);
    }else{
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUpWithText(win? 'YOU WON' : 'YOU LOST');
}
function showStopButton(){
    const icon = gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}
function hideGameButton(){
    gameBtn.style.visibility = 'hidden';
}
function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer(){
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT===score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}
function stopGameTimer(){
    clearInterval(timer);
}
function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}
function showPopUpWithText(text){
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}
function hidePopUp(){
    popUp.classList.add('pop-up--hide');
}
function initGame(){
    score = 0;
    field.innerHTML = '';  // 새로 시작할 때마다 당근, 벌레들 리셋
    gameScore.innerText = CARROT_COUNT; 

    //벌레와 당근을 생성한 뒤 field에 추가해줌
    addItem('carrot',CARROT_COUNT,'img/carrot.png');
    addItem('bug',BUG_COUNT,'img/bug.png');
}
function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        // 당근!!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if(score === CARROT_COUNT){
            finishGame(true);
        }
    }else if(target.matches('.bug')){
        // 벌레!!
        finishGame(false);
    }
}
function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound){
    sound.pause();
}
function updateScoreBoard(){
    gameScore.innerText = CARROT_COUNT - score;
}
function addItem(className, count, imgPath){
    // 전체 넓이
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    // 랜덤 숫자를 우리가 원하는 count만큼 돌게 해야 함
    for(let i=0; i < count; i++ ){
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);

        item.style.position='absolute';
        const x = randomNumber(x1,x2); // random 숫자: 0~필드의 넓이/높이 중 하나
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item); // field에 item 추가
    }
}

function randomNumber(min,max){
    return Math.random() * (max-min) + min;
}






