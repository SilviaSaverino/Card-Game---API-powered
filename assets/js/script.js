const shuffleCardBtn = document.getElementById("shuffle-card-deck-btn")
const getDrawCardsBtn = document.getElementById("draw-cards-btn")
const cardsImage = document.getElementById("cards-img")
const results = document.getElementById("results")
const cardCount = document.getElementById("card-count")
const finalResult = document.getElementById("final-result")

let cardId
let pcScoreTotal = 0
let userScoreTotal = 0

window.onLoad = function(){
    getDrawCardsBtn.disabled = true
    showGameRules()
    addBouncingEffectToshuffleCardBtn()
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
    showGameRules()
    removeGlowEffect()
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

    if (data.remaining === 0){
        getDrawCardsBtn.disabled = true
        removeDrawnCards()
        displayFinalWinner(pcScoreTotal, userScoreTotal)
    }

    })
    removeBouncingEffectFromNewCardsBtn()
}


function determineWinner(card1, card2) {
    const cardValueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]

    const firstCardValueIndex = cardValueOptions.indexOf(card1.value)
    const secondCardValueIndex = cardValueOptions.indexOf(card2.value)
      
    if (firstCardValueIndex > secondCardValueIndex) {
        incrementPcScore()
        return "PC wins!"
    } else if (firstCardValueIndex < secondCardValueIndex) {
        incrementUserScore()
        return "You win!"
    } else {
        return "It's a tie!"
    }
}

function removeDrawnCards(){
    cardsImage.children[0].innerHTML = ""
    cardsImage.children[1].innerHTML = ""
}

function addBouncingEffectToshuffleCardBtn() {
    shuffleCardBtn.classList.add("bounce")
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

function incrementPcScore(){
    const pcScore = document.getElementById("pc-score")
    pcScoreTotal++
    pcScore.textContent = `PC score: ${pcScoreTotal}`
}

function incrementUserScore(){
    const userScore = document.getElementById("user-score")
    userScoreTotal++
    userScore.textContent = `Your score: ${userScoreTotal}`
}

function displayFinalWinner(pcScoreTotal, userScoreTotal){
    
    if (pcScoreTotal > userScoreTotal) {
        finalResult.textContent = "The computer won the game!"
    } else if (pcScoreTotal < userScoreTotal) {
        finalResult.textContent = "You won the game!"
    } else {
        finalResult.textContent = "It's a tie game!"
    }
    addGlowEffect()
    addBouncingEffectToshuffleCardBtn()
}

function showGameRules(){
    finalResult.textContent = "Higher card wins!"
}

function addGlowEffect(){
    finalResult.classList.add("glow")
}

function removeGlowEffect(){
    finalResult.classList.remove("glow")
}