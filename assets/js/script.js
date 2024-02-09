const shuffleCardBtn = document.getElementById("shuffle-card-deck-btn")
const getDrawCardsBtn = document.getElementById("draw-cards-btn")
const cardsImage = document.getElementById("cards-img")
const results = document.getElementById("results")
const cardCount = document.getElementById("card-count")
let cardId


window.onLoad = function(){
    shuffleCardBtn.classList.add("bounce")
    getDrawCardsBtn.disabled = true
}


shuffleCardBtn.addEventListener("click", handleClickOnShuffleCardBtn)
getDrawCardsBtn.addEventListener("click", handleClickOnDrawCardsBtn)

function handleClickOnShuffleCardBtn() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            cardId = data.deck_id
            console.log(data)
            cardCount.textContent = `New deck contains: ${data.remaining} cards`
        })
    removeDrawnCards()
    removeBouncingEffectFromShuffleDeckBtn()
}

function handleClickOnDrawCardsBtn(){
    fetch(`https://deckofcardsapi.com/api/deck/${cardId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        cardCount.textContent = `Remaining cards: ${data.remaining}`
        cardsImage.children[0].innerHTML = `
        <img src=${data.cards[0].image} />
    `
        cardsImage.children[1].innerHTML = `
        <img src=${data.cards[1].image} />
    `
    const winnerText = determineWinner(data.cards[0],data.cards[1])
    results.textContent = `${winnerText}`
    })
    removeBouncingEffectFromNewCardsBtn()
}

function determineWinner(card1, card2) {
    const cardValueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const firstCardValueIndex = cardValueOptions.indexOf(card1.value)
    const secondCardValueIndex = cardValueOptions.indexOf(card2.value)
      
    if (firstCardValueIndex > secondCardValueIndex) {
        return "Card 1 wins!"
    } else if (firstCardValueIndex < secondCardValueIndex) {
       return "Card 2 wins!"
    } else {
        return "It's a tie!"
    }
}

function removeDrawnCards(){
    cardsImage.children[0].innerHTML = ""
    cardsImage.children[1].innerHTML = ""
}

function removeBouncingEffectFromShuffleDeckBtn() {
    shuffleCardBtn.classList.remove("bounce")
    enableDrawCardBtn()
    addBouncingEffectToNewCardsBtn()
}

function enableDrawCardBtn(){
    getDrawCardsBtn.disabled = false
}

function addBouncingEffectToNewCardsBtn() {
    getDrawCardsBtn.classList.add("bounce")
}

function removeBouncingEffectFromNewCardsBtn() {
    getDrawCardsBtn.classList.remove("bounce")
}