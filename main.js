// 1.ok 랜덤번호 지정 

// 2.ok 유저가 번호 입력한다. 그리고 go라는 버튼을 누름

// 3.ok 유저가 랜덤번호를 맞추면, 맞췄습니다.
//    랜덤번호 < 유저번호 Down!!!
//    랜덤번호 > 유저번호 up!!!
// 4.ok Reset버튼을 누르면 게임이 리셋
// 5.ok 5번의 기회를 다쓰면 게임이 끝남. (더 이상 추측 불가, 버튼이 disable)
//   유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회소모x
//   유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회소모x

let computerNum = 0;
let playButton = document.getElementById("play-button");  /* 2-1 버튼 가져옴 */
let userInput = document.getElementById("user-input");  /* 2-4 인풋 가져옴 */
let resultArea = document.getElementById("result-area");  /* 3-2 div가져옴 */
let resetButton = document.getElementById("reset-button");  /* 4-1 reset버튼 가져옴 */
let chanceArea = document.getElementById("chance-area");
let chances = 5;   /* 5-1 */
let gameOver = false
let history = []

playButton.addEventListener("click",play);  /* 2-2 이벤트와 함수 매개변수로 넣어줌 */
resetButton.addEventListener("click",reset);  /* 4-2 이벤트, 함수 매개변수로 넣어줌 */
userInput.addEventListener("focus", function(){userInput.value=""})

function pickRandomNum() {

  computerNum = Math.floor(Math.random() * 100)+1;
  console.log("정답", computerNum);
}

function play () {        /* 2-3 함수 추가 */
  let userValue = userInput.value    /* 2-4 userInput의 값을 가져와서 userValue에 넣어줌 */

  // 유효성검사
  if(userValue<1 || userValue>100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해주세요."
    return;
  }  

  if(history.includes(userValue)) {
    resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요."
    return;
  }  

  chances --;   /* 5-2 */
  chanceArea.textContent=`남은기회:${chances}번`
  console.log("chance",chances);

  if(userValue < computerNum) {     /* 3-1 함수넣기 */
    resultArea.textContent = "Up!!"    
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!"    
  } else {
    resultArea.textContent = "정답입니다!!"   
    gameOver = true 
  }

  history.push(userValue)
  console.log(history)

  if(chances < 1) {
    gameOver = true
  }

  if (gameOver == true) {
    playButton.disabled = true;
  }
}

function reset () {   /* 4-3 함수 추가 */
  // user input창이 깨끗하게 정리
  userInput.value = ""
  // 새로운 번호가 생성
  pickRandomNum();

  resultArea.textContent="결과값이 여기나옵니다."
}

pickRandomNum();