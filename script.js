const cards = document.querySelectorAll('.flip-card-front');
const cardInner = document.querySelectorAll('.flip-card-inner');
const cardsContainer = document.querySelector('.cards')
const scoreDOM = document.querySelector('.score');
const startButton = document.querySelector('.start');
const blackBg = document.querySelector('.black');
const cardValue = document.querySelectorAll('.flip-card-back');

// Win Popup DOM Selection
const winModal = document.querySelector('.win');
const newGameButton = document.querySelector('.new-game');

let score = 0;
let arrCards = [];
let innerCards = [];
let collection = [];

// Randomize Card Function
const randomizeCard = () => {
    let card = '';

    const role = ['AS', 'AS', 'King', 'King', 'Queen', 'Queen', 'Jack', 'Jack', 'Poker', 'Poker', 'Joker', 'Joker'];

    const callRole = [];

    role.forEach(each => {
        card += `<div class="flip-card">
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                            <img src="./img/cards.png" width="95px">
                        </div>
                        <div class="flip-card-back">${each}</div>
                    </div>
                </div>`
    });

    cardsContainer.innerHTML = card;
}

// Start Event
startButton.addEventListener('click', function(){
    blackBg.classList.add('hidden');
    randomizeCard();
});

// newGameButton.addEventListener('click', function(){
//     winModal.classList.add('hidden')
// })

const winPopup = (score) => {
    let winDOM = '';
    winDOM += `<h1>You Won!</h1>
                <h5>Your High Score is</h5>
                <p>${score}</p>
                <button class="new-game">New Game</button>`;

    winModal.innerHTML = winDOM;
    winModal.classList.remove('hidden');
}

// CheckCard Function
const checkCard = (value, inner) => {
    arrCards.push(value);
    innerCards.push(inner);
    console.log(collection)

    // Inspection arrays
    // console.log(arrCards);
    // console.log(innerCards);

    if(arrCards.length == 2 && arrCards[0] == arrCards[1]){

        setTimeout(() => {
            scoreDOM.innerHTML = score += 2;
            // console.log(arrCards);
        }, 800)

        setTimeout(() => {
            innerCards = [];
            // console.log(innerCards);
        }, 800);

        // remove cards from array
        arrCards = [];

        collection.push(value);

        setTimeout(() => {
            if(collection.length == 6){
                winPopup(score);
            }
        }, 950)
        // If Done All Cards

    } else if (arrCards.length == 2 && arrCards[0] != arrCards[1]){

        setTimeout(() => {

            // Jika score 0 dan kalah maka score tetap 0
            if(score == 0){
                score = 0;
            // jika tidak berkurang 2
            } else {
                score -= 2;
            }

            scoreDOM.innerHTML = score;
        }, 800)

        setTimeout(() => {
            innerCards[0].classList.remove('rotate180');
            innerCards[1].classList.remove('rotate180');
            innerCards = [];
        }, 800);

        // remove cards from array
        arrCards = [];
    }
}

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