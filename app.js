// 1. Create two variables, firstCard and secondCard.
// 2. Set their values to a random number between 2-11
// 3. Create a variable, sum, and set it to the sum of the two cards
// 4. Write conditional according to these rules:
//  if less than or equal to 20 -> "Do you want to draw a new card?"
//  else if exactly 21 -> "You've got Blackjack!"
//  else -> "You're out of the game!"
// 5. Create a variable called hasBlackJack and assign it to false
// 6. Create a variable called isAlive and assign it to true
// 7. Flip its value to false in appropriate code block
// 8. Declare a variable called message and assign its value to an empty string
// 9. Reassign  message variable to string thats logged out
// 10. Create a startGame() function. Move conditional
//  below (line 11-20) inside body of function.
// 11. Store message-el paragraph in a variable called messageEl
// 12. Display message in ] messageEl
// 13. Store sum paragraph in a variable called sumEl
// 14. Render sum on page with this format -> "Sum: 14"
// 15. Store cards paragraph in a variable called cardsEl
// 16. Render cards on page with this format -> "Cards: 10 4"
// 17. Create function newCard() that logs out "Drawing a new card from the deck!"
// 18. Create a card variable and add new card to sum variable
// 20. Call startGame()
// 21. Rename startGame() function to renderGame()
// 22. Create new function startGame() that calls function renderGame()
// 23. Create new array - cards - that contains firstCard and secondCard.
// 24. Reference cards array when rendering out cards
// 25. Create for loop that renders out all cards instead of just two
// 26. Push new card to cards array
// 27. Create a function, getRandomCard() return a random number between 1 and 13.
// 28. Set value of firstCard and secondCard to getRandomCard() function.
// 29. Set value of card variable in newCard() function to getRandomCard() function.
// 30. Write if else statement for getRandomCard() function.
// 31. Assign the first and secondCard variables in startGame() function to getRandomCardo().
// 32. Re-assign  cards and sum variables so game can start
// 33. Fix NEW CARD button. Only allow player to get a new card if isAlive is true and hasBlackJack is false
// 34. Create player object giving it two keys, name and chips, set their values.
// 35. Grab ahold of player-el and store in variable called playerEl
// 36. Render player's name and chips in playerEl


let player = {
    name: "devancorleone",
    chips: 424
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")

playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
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
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}
