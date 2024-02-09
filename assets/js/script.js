document.getElementById("get-card-deck-btn").addEventListener("click", handleClickOnGetCardBtn)
document.getElementById("draw-cards-btn").addEventListener("click", handleClickOnDrawCardsBtn)

let cardId

function handleClickOnGetCardBtn() {
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
        document.getElementById("cards-img").innerHTML = `
        <img src=${data.cards[0].image} />
        <img src=${data.cards[1].image} />
        `
    })
    
}

