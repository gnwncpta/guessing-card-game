const cards = document.querySelectorAll('.flip-card-front');
const cardInner = document.querySelectorAll('.flip-card-inner');
const cardsContainer = document.querySelector('.cards')
const scoreDOM = document.querySelector('.score');
const cardValue = document.querySelectorAll('.flip-card-back');

// Black Opacity Selection
const blackBg = document.querySelector('.black');

// Win Popup DOM Selection
const winModal = document.querySelector('.win');
const newGameButton = document.querySelector('.new-game');

// Start DOM Selection
const startGame = document.querySelector('.start-game');
const startButton = document.querySelector('.start');

// Retry DOM Selection
const retry = document.querySelector('.retry-mobile');

let score = 0;
let arrCards = [];
let innerCards = [];
let collection = [];

// Randomize Card Function
const randomizeCard = () => {
    let card = '';

    // Logic Random Array
    const role = ['AS', 'AS', 'King', 'King', 'Queen', 'Queen', 'Jack', 'Jack', 'Poker', 'Poker', 'Joker', 'Joker'];
    const num = [3, 7, 11, 9, 4, 2, 5, 1, 8, 6, 0, 10];

    const randomizeRole = [];

    role.forEach((each, index) => {
        card += `<div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="./img/cards.png" width="95px">
                        </div>
                        <div class="flip-card-back">${role[num[index]]}</div>
                    </div>
                </div>`;
    });

    cardsContainer.innerHTML = card;
}

// Start Event
startButton.addEventListener('click', function(){
    blackBg.classList.add('hidden');
    startGame.classList.add('hidden');
    randomizeCard();
});

// Win Popup Show after Winning the game
const winPopup = (score) => {
    let winDOM = '';
    winDOM += `<h1>You Won!</h1>
                <h5>Your High Score is</h5>
                <p>${score}</p>
                <button class="new-game">New Game</button>`;

    winModal.innerHTML = winDOM;
    winModal.classList.remove('hidden');
    blackBg.classList.remove('hidden');
}

// When user press New Game Button
// The page will reload
// Event Binding
document.addEventListener('click', function(e){
    const target = e.target;
    if(target.classList.contains('new-game')){
        location.reload();
        startGame.classList.add('hidden');
        blackBg.classList.add('hidden');
    }
});

// Retry Event
retry.addEventListener('click', function(){
    location.reload();
})

// CheckCard Function
const checkCard = (value, inner) => {
    arrCards.push(value);
    innerCards.push(inner);
    // console.log(collection) -> Ignore this

    // Inspection arrays -> Ignore this
    // console.log(arrCards);
    // console.log(innerCards);

    // Check if the array Cards have 2 items and same
    if(arrCards.length == 2 && arrCards[0] == arrCards[1]){

        // This code gives score 2 when the player got correct card
        setTimeout(() => {
            scoreDOM.innerHTML = score += 2;
            // console.log(arrCards);
        }, 800)

        // This code gives inner cards animation wrong card
        setTimeout(() => {
            innerCards[0].classList.add('animate-true');
            innerCards[1].classList.add('animate-true');
        }, 800);

        // This code removes inner card items on innerCards array
        setTimeout(() => {
            innerCards = [];
            // console.log(innerCards);
        }, 1000);

        // remove cards from array
        arrCards = [];
        
        // Push value card for checking if done or not.
        collection.push(value);

        innerCards[0].classList.remove('animate-true');
        innerCards[1].classList.remove('animate-true');
        innerCards[0].classList.remove('animate-false');
        innerCards[1].classList.remove('animate-false');

        // If Player done with all cards.
        setTimeout(() => {
            if(collection.length == 6){
                winPopup(score);
            }
        }, 950)

      // Check if the array Cards have 2 items and not same
    } else if (arrCards.length == 2 && arrCards[0] != arrCards[1]){

        // Check if the score 0 then still set 0
        setTimeout(() => {

            // Jika score 0 dan kalah maka score tetap 0
            if(score == 0){
                score = 0;
            // jika tidak berkurang 2
            } else {
                score -= 2;
            }

            scoreDOM.innerHTML = score;
        }, 800);

        // This code gives inner cards animation wrong card
        setTimeout(() => {
            innerCards[0].classList.add('animate-false');
            innerCards[1].classList.add('animate-false');
        }, 800);

        // This code removes rotate180 class on inner cards
        setTimeout(() => {
            innerCards[0].classList.remove('rotate180');
            innerCards[1].classList.remove('rotate180');
            innerCards = [];
        }, 1550);

        // remove cards from array
        arrCards = [];

        innerCards[0].classList.remove('animate-true');
        innerCards[1].classList.remove('animate-true');
        innerCards[0].classList.remove('animate-false');
        innerCards[1].classList.remove('animate-false');
        
    }
}

document.addEventListener('click', function(e){
    const target = e.target.localName

    if(target == 'img'){
        if(innerCards.length < 2){
            const cardInner = e.target.parentElement.parentElement;
            const cardValue = e.target.parentElement.parentElement.childNodes[3].textContent;
            cardInner.classList.add('rotate180');
            checkCard(cardValue, cardInner);
        }
    }
})

// Cards Event
// cards.forEach(card => {
//     card.addEventListener('click', function(e){
//         if(innerCards.length < 2){
//             const cardInner = e.target.parentElement.parentElement;
//             const value = e.target.parentElement.parentElement.childNodes[3].textContent;
//             cardInner.classList.add('rotate180');
//             checkCard(value, cardInner);
//         }
//     });
// });
