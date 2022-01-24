// 1. Create two variables, firstCard and secondCard.
// 2. Set their values to a random number between 2-11
// 3. Create a variable, sum, and set it to the sum of the two cards
// 4. Write the conditional according to these rules:
//  if less than or equal to 20 -> "Do you want to draw a new card?"
//  else if exactly 21 -> "You've got Blackjack!"
//  else -> "You're out of the game!"
// 5. Create a variable called hasBlackJack and assign it to false
// 6. Create a variable called isAlive and assign it to true
// 7. Flip its value to false in appropriate code block
// 8. Declare a variable called message and assign its value to an empty string
// 9. Reassign  message variable to string thats logged out
// 10. Create a startGame() function. Move \ conditional
//  below (line 11-20) inside body of function.
// 11. Store message-el paragraph in a variable called messageEl
// 12. Display message in ] messageEl
// 13. Store sum paragraph in a variable called sumEl
// 14. Render sum on the page with this format -> "Sum: 14"
// 15. Store cards paragraph in a variable called cardsEl
// 16. Render cards on the page with this format -> "Cards: 10 4"
// 17. Create function newCard() that logs out "Drawing a new card from the deck!"
// 18. Create a card variable and add the new card to the sum variable
// 20. Call startGame()
// 21. Rename startGame() function to renderGame()
// 22. Create new function startGame() that calls function renderGame()
// 23. Create new array - cards - that contains firstCard and secondCard.
// 24. Reference the cards array when rendering out the cards
// 25. Create for loop that renders out all the cards instead of just two
// 26. Push the new card to the cards array
// 27. Create a function, getRandomCard() return a random number between 1 and 13.
// 28. Set the value of firstCard and secondCard to getRandomCard() function.
// 29. Set value of card variable in newCard() function to getRandomCard() function.

let firstCard = getRandomCard()
let secondCard = getRandomCard()
let cards = [firstCard, secondCard]
let sum = firstCard + secondCard
let hasBlackJack = false
let isAlive = true
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")


function getRandomCard() {
    let randomNumer = Math.floor(Math.random() * 13) + 1
    if (randomNumer > 10) {
        return 10
    } else if (randomNumer === 1) {
        return 11
    } else {
        return randomNumer
    }
}

function startGame() {
    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
}