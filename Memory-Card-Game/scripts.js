const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
// lockBoard fixes edge case where user clicks other cards before the last two cards have flipped back over
let lockBoard = false;
let firstCard, secondCard;
cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if (lockBoard) {
        return;
    };
    // prevents doubleclicking the same card setting the match to true and removing the event listener from that one card only
    if (this === firstCard) {
        return;
    };
        // console.log('I was clicked');
        // console.log(this);
        this.classList.toggle('flip');
    
        if (!hasFlippedCard) {
            // first click
            hasFlippedCard = true;
            firstCard = this;
            console.log({hasFlippedCard, firstCard})
        } else {
            // second click
            secondCard = this;
            console.log({hasFlippedCard, secondCard});
            checkForMatch();
        }
    }
    

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    // ES6 destructuring assignments!
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// extra parentheses creates an Immediately Invoked Function Expression(IIFE). This invokes the function immediately after it is defined in the code evaluation.
(function shuffleCards() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        // The CSS order property defines where a flex item is placed relative to its siblings within a flexible container.
        card.style.order = randomPosition;
    });
})();


// Initial runthrough of code before refactoring
// function flipCard() {
//     // console.log('I was clicked');
//     // console.log(this);
//     this.classList.toggle('flip');

//     if (!hasFlippedCard) {
//         // first click
//         hasFlippedCard = true;
//         firstCard = this;
//         console.log({hasFlippedCard, firstCard})
//     } else {
//         // second click
//         hasFlippedCard = false;
//         secondCard = this;
//         console.log({hasFlippedCard, secondCard});

//         // do cards match?
//         console.log(firstCard.dataset.framework);
//         console.log(secondCard.dataset.framework);
//         if (firstCard.dataset.framework === secondCard.dataset.framework) {
//             // a match!
//             firstCard.removeEventListener('click', flipCard);
//             secondCard.removeEventListener('click', flipCard);
//         } else {
//             // not a match
//             setTimeout(() => {
//                 firstCard.classList.remove('flip');
//                 secondCard.classList.remove('flip');
//             }, 1500);
//         }
//     }
// }
