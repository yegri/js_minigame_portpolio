'use strict';

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect(); // field의 전체적인 사이즈와 포지션 알기 위해

function initGame(){
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    console.log(fieldRect);
    addItem('carrot',5,'img/carrot.png');
    addItem('bug',5,'img/bug.png');
}

function addItem(className, count, imgPath){
    // 전체 넓이
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width;
    const y2 = fieldRect.height;

    // 랜덤한 숫자를 우리가 원하는 count만큼 돌게 해야 함
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
initGame();





// const count = document.querySelector('.counter');
// const startBtn = document.querySelector('.btn');
// const timerDisplay = document.querySelector('.timer');

// function startGame() {
//     // 1. 시작버튼이 정지버튼으로 바뀜
//     startBtn.setAttribute('class','btn');
//     startBtn.innerHTML = '<i class="fa-solid fa-stop"></i>';

//     // 2. 타이머 시작
    

//     // 3. 당근과 벌레들이 랜덤으로 배치
//     const images = ['bug.png','carrot.png','bug.png','carrot.png','bug.png','carrot.png','bug.png','carrot.png','bug.png','carrot.png','bug.png','carrot.png','bug.png','carrot.png','bug.png','carrot.png',];

//     const chosenImage = images[Math.floor(Math.random()*images.length)];

//     const bgImage = document.createElement('img');

//     bgImage.src = `img/${chosenImage}`;

//     document.body.append(bgImage);
// }

// function clickCarrot(){
//     // 1. 당근이 없어짐
    
//     // 2. 당근 count 줄어듦
// };

// function clickBug(){
//     // You Lose 나타남
// };

// function stopGame(){
//     // Game 중지

// };

// function init(){
//     startBtn.addEventListener('click',startGame);
// }
// init();