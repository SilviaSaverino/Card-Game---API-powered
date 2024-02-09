document.getElementById("shuffle-card-deck-btn").addEventListener("click", handleClickOnShuffleCardBtn)
document.getElementById("draw-cards-btn").addEventListener("click", handleClickOnDrawCardsBtn)

let cardId

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
        document.getElementById("cards-img").children[0].innerHTML = `
        <img src=${data.cards[0].image} />
    `
    document.getElementById("cards-img").children[1].innerHTML = `
        <img src=${data.cards[1].image} />
    `
    })
    
}

