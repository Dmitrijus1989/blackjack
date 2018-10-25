let deck = [];
let bet = 0;
function createDeck() {
  for (let i = 0; i < 4; i++) {
    for (j = 2; j <= 14; j++) {
      let color;
      let number;
      let value;
      let name;
      let colorForImg
      let frontImage;
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
      if (color === 'hearts') colorForImg = 'H'
      if (color === 'clubs') colorForImg = 'C'
      if (color === 'diamonds') colorForImg = 'D'
      if (color === 'spades') colorForImg = 'S'
      frontImage = `PNG/${j}${colorForImg}.png`
      deck.push({
        color: color,
        value: value,
        name: number,
        frontImage: frontImage
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
    let randomCard = Math.floor(Math.random() * deck.length )
    this.cardsPlayerHave.push(deck.splice(randomCard, 1)[0])
    refresh()
    if (this.score > 21) {
      document.getElementById("lose").style.display = "flex"
      bet = 0;
      betTime();
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
      dealer.takeCard()
      refresh()
    }
     if (dealer.score <= 21 && dealer.score > player.score) {
      document.getElementById("lose").style.display = "flex"
      bet = 0;
      betTime()
    } else if (dealer.score < player.score) {
      document.getElementById("won").style.display = "flex"
      wonBet()
      bet = 0;
      betTime()
    } else {
      document.getElementById("tie").style.display = "flex"
      player.money = player.money + bet;
      refresh()
      bet = 0;
      betTime()
    }
    },
  takeCard: function() {
    let randomCard = Math.floor(Math.random() * deck.length)
    dealer.cards.push(deck.splice(randomCard, 1)[0])
    dealer.scoreIs();
    document.getElementById("cardsLeft").innerHTML = "cards left: "+deck.length;
    if (dealer.score > 21) {
      document.getElementById("won").style.display = "flex"
      wonBet();
      bet = 0;
      betTime()
    }
  }
}
let player = new Player(1000, [])

function startTheGame() {
  let player1Cards = ""
  let dealer1Cards = ""
  document.getElementById('stand').style.display = "flex";
  document.getElementById('hit').style.display = "flex";
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < numberOfPlayers; i++) {
      let randomCard = Math.floor(Math.random() * deck.length)
      player.cardsPlayerHave.push(deck.splice(randomCard, 1)[0])
    }
    if (j == 0) {
      let dealerRandomCard = Math.floor(Math.random() * deck.length)
      dealer.cards.push(deck.splice(dealerRandomCard, 1)[0])
    }
  }
  refresh()
}
function replayTheGame() {
  player.cardsPlayerHave = [];
  dealer.cards = [];
  player.score = 0;
  dealer.score = 0;
  document.getElementById("lose").style.display = "none"
  document.getElementById("won").style.display = "none"
  document.getElementById("tie").style.display = "none"
  document.getElementById("noMoney").style.display = "none"
  startTheGame()
  document.getElementById("lowerDropDown").style.transform = 'scaleY(1)';
}
function refresh() {
  let player1Cards = ""
  let dealer1Cards = ""
  player.scoreIs()
  dealer.scoreIs()
  player.cardsPlayerHave.map(function (element, index){
    player1Cards += '<img src="'+element.frontImage+'">'
  })
  document.getElementById("playerColor").innerHTML = player1Cards
  document.getElementById("playerScore").innerHTML ="Score is: " + player.score
  if (document.getElementsByClassName('playerColor')[0].lastChild) {
      for (var i = 0; i < document.getElementsByClassName('playerColor')[0].children.length; i++) {
        let multiNumber = 25;
        multiNumber = multiNumber * i;
        document.getElementsByClassName('playerColor')[0].children[i].style.left = `${multiNumber}px`
    }
}

  dealer.cards.map(function (element, index){
    dealer1Cards += '<img src="'+element.frontImage+'">'
  })
  document.getElementById("computerColor").innerHTML = dealer1Cards
  document.getElementById("computerScore").innerHTML ="Score is: " + dealer.score
  if (document.getElementsByClassName('computerColor')[0].lastChild) {
      for (var i = 0; i < document.getElementsByClassName('computerColor')[0].children.length; i++) {
        let multiNumber = 25;
        multiNumber = multiNumber * i;
        document.getElementsByClassName('computerColor')[0].children[i].style.left = `${multiNumber}px`
    }
}
  document.getElementById("cardsLeft").innerHTML = "cards left: "+deck.length
  document.getElementById("bank").innerHTML = "bank: "+player.money
  document.getElementById("playingBank").innerHTML = "bet is: "+bet
}
function doHide() {
  document.getElementById("noMoney").style.display = "none"
}
function makeABet(tempBet) {
  if (player.money >= tempBet) {
  player.money -= tempBet;
  bet += tempBet;
  refresh()
} else {
  document.getElementById("noMoney").style.display = "flex"
  setTimeout( 'doHide()', 3500 )
  refresh()
  }
}
document.getElementById('overall').addEventListener("click", function(e) {
  switch (e.target) {
    case bet1:
    case bet5:
    case bet10:
    case bet25:
    case bet50:
    case bet100:
      break;
    default:
    doHide();
  }
  if (document.getElementById('blackBox').style.opacity === '0.6' && e.target === blackBox && document.getElementById('playingBank').style.zIndex === '1') {
    startBeting()
    noAlertMessage()
  }
})
function startBeting() {
document.getElementById('playingBank').style.transform = 'scale(2)'
document.getElementById('playingBank').style.zIndex = '10';
document.getElementById('bank').style.zIndex = '10';
document.getElementById("lowerDropDown").style.transform = 'scaleY(1)';
refresh()
}
function betTime(){
  document.getElementById('blackBox').style.opacity = '0.6';
  document.getElementById('blackBox').style.zIndex = '7';
  if (document.getElementById('playingBank').style.zIndex === '10') {
    return
  }else {
    console.log("replaying The Game!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    setTimeout ('noAlertMessage()', 4000)
    setTimeout ("startBeting()", 4000)
  }
}
function noMoreBlackBox() {
  document.getElementById('blackBox').style.opacity = '0';
  document.getElementById('blackBox').style.zIndex = '0';
  document.getElementById('playingBank').style.transform = 'scale(1)';
  document.getElementById('playingBank').style.zIndex = '1';
  document.getElementById('bank').style.zIndex = '1';
}
function wonBet() {
  player.money = player.money + (bet * 2)
  refresh()
}
function deal() {
  replayTheGame()
  noMoreBlackBox()
  refresh()
  document.getElementById("lowerDropDown").style.transform = 'scaleY(0)';
}
function noAlertMessage() {
  document.getElementById("lose").style.display = "none"
  document.getElementById("won").style.display = "none"
  document.getElementById("tie").style.display = "none"
  document.getElementById("noMoney").style.display = "none"
}
refresh()
console.log(deck);
