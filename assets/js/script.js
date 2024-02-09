const shuffleCardBtn = document.getElementById("shuffle-card-deck-btn")
const getDrawCardsBtn = document.getElementById("draw-cards-btn")
const cardsImage = document.getElementById("cards-img")

let cardId

shuffleCardBtn.addEventListener("click", handleClickOnShuffleCardBtn)
getDrawCardsBtn.addEventListener("click", handleClickOnDrawCardsBtn)

function handleClickOnShuffleCardBtn() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            cardId = data.deck_id
        })
}

function handleClickOnDrawCardsBtn(){
    fetch(`https://deckofcardsapi.com/api/deck/${cardId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        cardsImage.children[0].innerHTML = `
        <img src=${data.cards[0].image} />
    `
        cardsImage.children[1].innerHTML = `
        <img src=${data.cards[1].image} />
    `
    })
    
}

function determineWinner(card1, card2) {
    const cardValueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const firstCardValueIndex = cardValueOptions.indexOf(card1.value)
    const secondCardValueIndex = cardValueOptions.indexOf(card2.value)
    console.log("card 1=", firstCardValueIndex)
    console.log("card 2=", secondCardValueIndex)

      
    if (firstCardValueIndex > secondCardValueIndex) {
        console.log("Card 1 wins!")
    } else if (firstCardValueIndex < secondCardValueIndex) {
        console.log("Card 2 wins!")
    } else {
        console.log("It's a tie!")
    }
}

const card1Obj = {
    value: "7"
}
const card2Obj = {
    value: "KING"
}

determineWinner(card1Obj, card2Obj)