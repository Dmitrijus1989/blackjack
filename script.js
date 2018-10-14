let deck = []
function createDeck() {
  for (let i = 0; i < 4; i++) {
    for (j = 2; j <= 14; j++) {
      let color;
      let number;
      let value;
      let name;
      if (i === 0) color = 'hearts'
      if (i === 1) color = 'clubs'
      if (i === 2) color = 'diamonds'
      if (i === 3) color = 'spades'
      if (j === 11) {
        number = 'jack';
        value = 10
      }
      if (j === 12) {
        number = 'queen';
        value = 10
      }
      if (j === 13) {
        number = 'king';
        value = 10
      }
      if (j === 14) {
        number = 'ace';
        value = 11
      }
      if (j < 11) number = j;
      if (j < 11) value = j;
      deck.push({
        color: color,
        value: value,
        name: number
      })
    }
  }
}
const Player = function(money, cardsPlayerHave) {
  this.money = money;
  this.cardsPlayerHave = cardsPlayerHave;
  this.score = 0;
  this.scoreIs = function() {
        this.score = 0;
      for (var i = 0; i < this.cardsPlayerHave.length; i++) {
        this.score += this.cardsPlayerHave[i].value
      }
    },
  this.takeCard = () => {
    let randomCard = Math.floor(Math.random() * deck.length - 1)
    this.cardsPlayerHave.push(deck.splice(randomCard, 1)[0])
    this.scoreIs()
    dealer.scoreIs()
    let player1Cards = ""
    this.cardsPlayerHave.map(function (element, index){
      player1Cards += "Card " + (index + 1) + ": " + element.name + " " + element.color + "<br>"
    })
    document.getElementById("playerColor").innerHTML = player1Cards
    document.getElementById("playerScore").innerHTML ="Score is: " + this.score
    document.getElementById("cardsLeft").innerHTML = "cards left: "+deck.length
    if (this.score > 21) {
      document.getElementById("lose").style.display = "flex"
    }
  };
  this.pass = () => {
    dealer.action();
  };
}
createDeck();
let numberOfPlayers = 1;
const dealer = {
  cards: [],
  score: 0,
  scoreIs: function() {
    dealer.score = 0;
    for (var i = 0; i < dealer.cards.length; i++) {
      dealer.score += dealer.cards[i].value
    }
  },
  action: function() {
      while (dealer.score < 17) {
      let dealer1Cards = ""
      dealer.takeCard()
      dealer.cards.map(function (element, index){
        dealer1Cards += "Card " + (index + 1) + ": " + element.name + " " + element.color + "<br>"
      })
      document.getElementById("computerColor").innerHTML = dealer1Cards
      document.getElementById("computerScore").innerHTML ="Score is: " + dealer.score
    }
     if (dealer.score <= 21 && dealer.score > player.score) {
      document.getElementById("lose").style.display = "flex"
    } else if (dealer.score < player.score) {
      document.getElementById("won").style.display = "flex"
    } else document.getElementById("tie").style.display = "flex"
    },
  takeCard: function() {
    let randomCard = Math.floor(Math.random() * deck.length - 1)
    dealer.cards.push(deck.splice(randomCard, 1)[0])
    dealer.scoreIs();
    document.getElementById("cardsLeft").innerHTML = "cards left: "+deck.length;
    if (dealer.score > 21) {
      document.getElementById("won").style.display = "flex"
    }
  }
}
let player = new Player(1000, [])

player.scoreIs()
dealer.scoreIs()
document.getElementById("playerScore").innerHTML ="Score is: " + player.score
document.getElementById("computerScore").innerHTML ="Score is: " + dealer.score

function startTheGame() {
  let player1Cards = ""
  let dealer1Cards = ""
  document.getElementById('stand').style.display = "flex";
  document.getElementById('hit').style.display = "flex";
  document.getElementById('play').style.display = "none";
  document.getElementById('replay').style.display = "flex";
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < numberOfPlayers; i++) {
      let randomCard = Math.floor(Math.random() * deck.length - 1)
      player.cardsPlayerHave.push(deck.splice(randomCard, 1)[0])
    }
    if (j == 0) {
      let dealerRandomCard = Math.floor(Math.random() * deck.length - 1)
      // dealer.score += deck[dealerRandomCard].value
      dealer.cards.push(deck.splice(dealerRandomCard, 1)[0])
    }
  }
  player.scoreIs()
  dealer.scoreIs()
  player.cardsPlayerHave.map(function (element, index){
    player1Cards += "Card " + (index + 1) + ": " + element.name + " " + element.color + "<br>"
  })
  document.getElementById("playerColor").innerHTML = player1Cards
  document.getElementById("playerScore").innerHTML ="Score is: " + player.score

  dealer.cards.map(function (element, index){
    dealer1Cards += "Card " + (index + 1) + ": " + element.name + " " + element.color + "<br>"
  })
  document.getElementById("computerColor").innerHTML = dealer1Cards
  document.getElementById("computerScore").innerHTML ="Score is: " + dealer.score
  document.getElementById("cardsLeft").innerHTML = "cards left: "+deck.length
}
function replayTheGame() {
  player.cardsPlayerHave = [];
  dealer.cards = [];
  player.score = 0;
  dealer.score = 0;
  document.getElementById("lose").style.display = "none"
  document.getElementById("won").style.display = "none"
  document.getElementById("tie").style.display = "none"
  startTheGame()
}
document.getElementById("cardsLeft").innerHTML = "cards left: "+deck.length
console.log(dealer);
console.log(player);
console.log(deck);
