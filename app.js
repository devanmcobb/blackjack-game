// 1. Create two variables, firstCard and secondCard.
// 2. Set their values to a random number between 2-11
// 3. Create a variable, sum, and set it to the sum of the two cards
// 4. Write the conditional according to these rules:
//  if less than or equal to 20 -> "Do you want to draw a new card?"
//  else if exactly 21 -> "You've got Blackjack!"
//  else -> "You're out of the game!"
// 5. Create a variable called hasBlackJack and assign it to false
// 6. Create a variable called isAlive and assign it to true
// 7. Flip its value to false in the appropriate code block
// 8. Declare a variable called message and assign its value to an empty string
// 9. Reassign the message variable to the string thats logged out
// 10. Create a startGame() function. Move the conditional
//  below (line 11-20) inside the body of the function.
// 11. Store the message-el paragraph in a variable called messageEl
// 12. Display the message in the messageEl


let firstCard = 10
let secondCard = 11
let sum = firstCard + secondCard
let hasBlackJack = false
let isAlive = true
let message = ""

let messageEl = document.getElementById("message-el")
console.log(messageEl)

function startGame() {
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