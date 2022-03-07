let cards = []
let dealerHand = []
let playerHand = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
const cardsEl = document.getElementById("cards-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const playerEl = document.getElementById("player-el")

// most popular version of the game is played with 6 decks of 52 cards
const cardPool = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A',
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J', 'J',
    'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q', 'Q',
    'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K',]
const suits = ['\u2660', '\u2665', '\u2663', '\u2666']
let pot = 100
let bet = document.getElementById('bet-input')

document.getElementById("pot-el").textContent = `Pot: ${pot}`

function checkNatural() {
    // natural is when the first 2 cards only total 21
    if (dealerHand.length === 2 && dealerHand === 21) {
        message = "BlackJack! Dealer Won!"
        if (sum < 21) {
            isAlive = false
        } else if (sum === 21) {
            message = "Standoff! You get your bet back"
            hasBlackJack = true
            pot += parseInt(bet.value())
            document.getElementById("pot-el").textContent = `Pot: ${pot}`
        }
    } else if (playerHand.length === 2 && playerHand === 21) {
        message = "BlackJack! You've Won!"
        hasBlackJack = true
        pot += bet.value() * 1.5
        document.getElementById("pot-el").textContent = `Pot: ${pot}`
    }
    checkBust()
}

function checkBust() {
    if (sum <= 20 & !hasBlackJack & isAlive) {
        message = "Do you want to draw a new card?"
    } else if (sum > 21) {
        message = "It's a bust"
        hasBlackJack = false
        isAlive = false
    }
    messageEl.textContent = message

    if (isAlive & !hasBlackJack) {
        document.getElementById("new-card-btn").style.display = "inline"
        document.getElementById("stand-btn").style.display = "inline"
        document.getElementById("start-btn").style.display = "none"
        bet.disabled = true
    } else {
        document.getElementById("new-card-btn").style.display = "none"
        document.getElementById("stand-btn").style.display = "none"
        document.getElementById("start-btn").style.display = "inline"
        bet.disabled = false
    }
}

function dealerPlay() {
    if (dealerSum < 17) {
        setTimeout(() => {
            renderGame("dealer")
            dealerPlay()
        }, 1000)
    } else {
        outcome()
    }
}

function randomCard() {
    let randomCard = Math.floor(Math.random() * cardPool.length)
    if (!cards.includes(randomCard)) {
        return randomCard
    } else {
        // if the card has been drawn, this prevents an endless loop.
        if (cards.length >= 312)
            cards = []
    }
    // then try again
    return randomCard()
}

function renderGame(player) { // deal card - player
    const nextCard = randomCard()
    const faceCards = ['J', 'Q', 'K']
    cards.push(nextCard)
    const cardEl = document.createElement("div")
    cardEl.classList.add('card')
    const cardNum = cardPool[nextCard]
    const cardSuit = suits[nextCard % 4]
    if (nextCard % 4 === 1 | nextCard % 4 === 3) {
        cardEl.classList.add('darkslateblue')
    }
    let checkSum = 0
    if (player === "player") {
        checkSum = sum
    } else {
        checkSum = dealerSum
    }
    let cardValue = 0
    if (cardNum === 'A' & checkSum + 11 <= 21) {
        cardValue = 11
    } else if (cardNum === 'A' & checkSum + 11 > 21) {
        cardValue = 1
    } else if (faceCards.includes(cardNum)) {
        cardValue = 10
    } else { cardValue = cardNum }

    if (player === "player") {
        cardsEl.appendChild(cardEl)
        cardEl.innerHTML = `${cardNum}<br>${cardSuit}`
        playerHand.push(nextCard)
        sum += cardValue
        document.getElementById("sum-el").textContent = `Sum: ${sum}`
    } else if (player === "dealer") {
        dealerHand.push(nextCard)
        dealerCardsEl.appendChild(cardEl)
        dealerSum += cardValue
        if (dealerHand.length === 2 & dealerSum != 21) {
            cardEl.classList.add('face-down')
            cardEl.textContent = '\u2655'
            document.getElementById("dealer-sum-el").textContent = `Sum: ???`
        } else {
            cardEl.innerHTML = `${cardNum}<br>${cardSuit}`
            document.getElementById("dealer-sum-el").textContent = `Sum: ${dealerSum}`
        }
    }
}


function newCard() {
    if (isAlive & !hasBlackJack & sum != 21) {
        renderGame("player")
        checkBust()
    } else if (sum === 21) {
        message = "You shouldn't do that!"
        messageEl.textContent = message
    }
}

function flipCard(secondCard) {
    return new Promise(resolve => {
        secondCard.classList.toggle('flipped')
        setTimeout(() => resolve(1), 1000)
    })

}

function resetDealerCard(secondCard) {
    card = dealerHand[1]
    const cardNum = cardPool[card]
    const cardSuit = suits[card % 4]
    secondCard.classList.remove('face-down', 'flipped')
    secondCard.innerHTML = `${cardNum}<br>${cardSuit}`
}


async function stand() {
    document.getElementById("new-card-btn").style.display = "none"
    document.getElementById("stand-btn").style.display = "none"
    message = "Dealer's turn..."
    document.getElementById("message-el").textContent = message
    const secondCard = dealerCardsEl.children[1]
    const flipped = await flipCard(secondCard)
    resetDealerCard(secondCard)
    document.getElementById("dealer-sum-el").textContent = `Sum: ${dealerSum}`
    dealerPlay()
}

function outcome() {
    if (dealerSum > 21) {
        message = "Dealer bust, you win!"
        pot += bet.value * 2
    } else if (dealerSum == sum) {
        message = "Push. Chips returned!"
        pot += parseInt(bet.value)
    } else if (sum > dealerSum) {
        message = "You win!"
        pot += bet.value * 2
    } else if (sum < dealerSum) {
        message = "Dealer wins!"
    }
    messageEl.textContent = message
    document.getElementById("pot-el").textContent = `Pot: ${pot}`
    document.getElementById("start-btn").style.display = "inline"
}

function startDealer() {
    renderGame("dealer")
    renderGame("dealer")
}

function startGame() {
    sum = 0
    cards = []
    playerHand = []
    dealerHand = []
    hasBlackJack = false
    cardsEl.innerHTML = ""
    document.getElementById("sum-el").textContent = "Sum: "
    document.getElementById("pot-el").textContent = `Pot: ${pot}`
    let firstCard = randomCard()
    let secondCard = randomCard()
    currentCards = [firstCard, secondCard]
    dealerSum = 0
    dealerCardsEl.innerHTML = ""
    document.getElementById("dealer-sum-el").textContent = "Sum: "

    if (bet.value > pot) {
        message = "Not enough credits to play!"
        document.getElementById("message-el").textContent = message
    } else {
        isAlive = true
        bet.disabled = true
        pot -= bet.value
        document.getElementById("pot-el").textContent = `Pot: ${pot}`
        renderGame('player')
        renderGame('player')
        startDealer()
        checkNatural()
    }
}