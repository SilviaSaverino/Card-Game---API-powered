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
            console.log(data)
            cardId = data.deck_id
        })
}

function handleClickOnDrawCardsBtn(){
    fetch(`https://deckofcardsapi.com/api/deck/${cardId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        cardsImage.children[0].innerHTML = `
        <img src=${data.cards[0].image} />
    `
        cardsImage.children[1].innerHTML = `
        <img src=${data.cards[1].image} />
    `
    })
    
}

