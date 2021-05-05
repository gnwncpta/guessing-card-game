const cards = document.querySelectorAll('.flip-card-front');
const cardInner = document.querySelectorAll('.flip-card-inner');
const scoreDOM = document.querySelector('.score');
const startButton = document.querySelector('.start');
const blackBg = document.querySelector('.black');
const cardValue = document.querySelectorAll('.flip-card-back');


// Available Cards (Role)
// AS, King, Queen, Poker, Joker, Jack

const randomizeCard = () => {

    const role = ['AS', 'King', 'Queen', 'Jack', 'Poker', 'Joker'];

    cardInner.forEach((card, index) => {
        console.log(card);
    });
}

// Start Event
startButton.addEventListener('click', function(){
    blackBg.classList.add('hidden');

    // randomizeCard();
});


let score = 0;
let arrCards = [];
let innerCards = [];

const checkCard = (value, inner) => {
    arrCards.push(value);
    innerCards.push(inner);

    // Inspection arrays
    // console.log(arrCards);
    // console.log(innerCards);

    if(arrCards.length == 2 && arrCards[0] == arrCards[1]){

        setTimeout(() => {
            score += 2;
            scoreDOM.innerHTML = score;
            // console.log(arrCards);
        }, 800)

        setTimeout(() => {
            innerCards = [];
            // console.log(innerCards);
        }, 800);

        // remove cards from array
        arrCards = [];

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

cards.forEach(card => {
    card.addEventListener('click', function(e){
        if(innerCards.length < 2){
            const cardInner = e.target.parentElement.parentElement;
            const value = e.target.parentElement.parentElement.childNodes[3].textContent;
            cardInner.classList.add('rotate180');
            checkCard(value, cardInner);
        }
    });
});