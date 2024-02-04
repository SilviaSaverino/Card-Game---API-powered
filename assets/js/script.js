document.getElementById("get-card-btn").addEventListener("click", handleClickOnGetCardBtn)

let cardId

function handleClickOnGetCardBtn() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            cardId = data.deck_id
        })
}