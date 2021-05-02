const cards = document.querySelectorAll('.flip-card-front img');
const cardInner = document.querySelectorAll('.flip-card-inner');
const scoreDOM = document.querySelector('.score');

// cardInner.forEach(card => {
//     card.addEventListener('click', function(e){
//         console.log(e);
//     })
// })


let score = 0;
let arrCards = [];
let innerCards = [];

const checkCard = (value, inner) => {
    arrCards.push(value);
    innerCards.push(inner);
    console.log(arrCards)
    console.log(innerCards)

    if(arrCards.length == 2 && arrCards[0] == arrCards[1]){

        setTimeout(() => {
            score += 2;
            scoreDOM.innerHTML = score;
        }, 800)

        setTimeout(() => {
            innerCards = [];
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

const inner = () => {

}

cards.forEach(card =>{
    card.addEventListener('click', function(e){
        const cardInner = e.target.parentElement.parentElement;
        const value = e.target.parentElement.parentElement.childNodes[3].textContent;
        cardInner.classList.add('rotate180');
        checkCard(value, cardInner)
    });
});