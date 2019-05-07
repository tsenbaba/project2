//global variables
let toggledCards = [],
    moves = 0,
    clockOff = true,
    time = 0,
    clockId,
    matched = 0;

const deck = document. querySelector('.deck');


//shuffle functions for all cards from deck
function shuffleCard(){
    const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
    const shuffledCards = shuffle(cardsToShuffle);
    for (card of shuffledCards){
        deck.appendChild(card);
    }
}
shuffleCard();

//shuffle function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
//end of shuffle functions



//Events Listeners for all buttons and cards
deck.addEventListener('click', function(event){
    const clickTarget = event.target;
    if (isClickValid(clickTarget)){
        if (clockOff) {
            startClock();
            clockOff =false;
        }
        toggleCard(clickTarget);
        addToggleCard(clickTarget);
        if (toggledCards.length === 2) {
            checkForMatch(clickTarget);
            addMove();
            checkScore();
        }
    }
});


document.querySelector('.modal_replay').addEventListener('click',replayGame);
document.querySelector('.restart').addEventListener('click', replayGame);
document.querySelector('.modal_start_button').addEventListener('click', toggleStartModal);


//end of event listeners


//Modal for start
function toggleStartModal() {
    const modal = document.querySelector('.modal_start');
    modal.classList.toggle('hide');
}


//functions for checking match
function checkForMatch(){
    if (
        toggledCards[0].firstElementChild.className ===
        toggledCards[1].firstElementChild.className
        ){
        toggledCards[0].classList.toggle('match');
        toggledCards[1].classList.toggle('match');
        toggledCards = [];
        matched++;
        if (matched === 8){
            gameOver();
                }
        } else {
            setTimeout(function () {
            toggleCard(toggledCards[0]);
            toggleCard(toggledCards[1]);
            toggledCards = [];
            }, 1000); 
        }
}

function isClickValid (clickTarget){
    return ( clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    toggledCards.length < 2 &&
    !toggledCards.includes(clickTarget)
  )
}

function toggleCard(clickTarget){
    clickTarget.classList.toggle('open');
    clickTarget.classList.toggle('show');
}

function addToggleCard(clickTarget){
    toggledCards.push(clickTarget);
}
//end of functions for checking match


//adding moves
function addMove(){
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

//stars functions
function callStars(){
    stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars){
        if (star.style.display !=='none'){
            starCount++;
        }
    }
    return starCount
}

function hideStar(){
    const starList = document.querySelectorAll('.stars li');
    for (star of starList){
        if (star.style.display !== 'none'){
            star.style.display = 'none';
            break;
        }
    }
}

function checkScore(){
    if (moves === 13 || moves === 17 || moves === 24)
    {hideStar();
        }
}
// end of stars function



//clock functions
function startClock(){
    clockId = setInterval(function (){
        time ++;
       displayTime();
    },1000);
}

function displayTime (){
    const clock = document.querySelector('.clock')
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (seconds < 10) {
		clock.innerHTML = `Time = ${minutes}:0${seconds}`;
	}else{
		clock.innerHTML = `Time = ${minutes}:${seconds}`;	
	}		
}

function stopClock(){
	clearInterval (clockId);	
}
//end of clock functions



//modal of game summary  functions
function toggleModal(){
    const modal=document.querySelector('.modal_background')
    modal.classList.toggle('hide');
}

function writeModalStats(){
    const timeStat = document.querySelector('.modal_time');
    const clockTime = document.querySelector('.clock').innerHTML;
    const movesStat = document.querySelector('.modal_moves');
    const starsStat = document.querySelector('.modal_stars');
    const stars = callStars();

    timeStat.innerHTML = `${clockTime}`;
    movesStat.innerHTML = `Moves = ${moves}`
    starsStat.innerHTML = `Stars = ${stars}`
}
//summary of the game functions


//restart-reset functions

function resetClockAndTime(){
    stopClock();
    clockOff = true;
    time = 0;
    displayTime();
}

function resetMoves(){
    moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
    stars = 0;
    const starList = document.querySelectorAll('.stars li');
    for (star of starList){
        star.style.display = 'inline';
    }
}
function resetCards(){
    const cards = document.querySelectorAll('.deck li');
    for (card of cards){
        card.className = 'card';
    }
}

//end restart-reset function

function resetGame(){
    matched = 0;
    toggledCards = [];
    resetClockAndTime();
    resetMoves();
    resetStars();
    resetCards();
    shuffleCard();
}


function replayGame() {
    matched = 0;
    resetGame();
    toggleModal();
    resetCards();
    resetStars()
}


function gameOver(){
    stopClock();
    writeModalStats();
    toggleModal();
}

shuffleCard();
writeModalStats();
toggleStartModal();




