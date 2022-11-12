/*
Coding Steps:
•	For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
o	You do not need to do anything special when there is a tie in a round.
•	Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include. 
o	You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser’s console.
The completed project should, when executed, do the following:
•	Deal 26 Cards to each Player from a Deck of 52 cards.
•	Iterate through the turns where each Player plays a Card.
•	The Player who played the higher card is awarded a point
o	Ties result in zero points for both Players
•	After all cards have been played, display the score and declare the winner.
•	Write a Unit Test using Mocha and Chai for at least one of the functions you write.
*/




const SUITS = ["club", "diamond", "heart", "spade"]
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const cardValueMap = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

class Card {

  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

class Player {

  constructor(name) {
    this.name = name;
    this.playerDeck = [];
    this.playerScore = 0;
  }

  addNewDeck(deck) {
    this.playerDeck = deck;
  }
}

class Deck {

  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  //get allows us to assign numberofcards = this.cards.length so it doesnt have to be repeated as often
  get numberOfCards() {
    return this.cards.length;
  }
  //method shuffle to shuffle cards up in a random order basically looping and swapping thru the cards 
  shuffle() {
    //To achieve the better sorting/ shuffling results we will create a for loop 
    //using this.numberOfCards will be a better way to see it in plain english 
    //i > 0; because we do not need to flip the final card.
    //in plain terms we are going from the back of the cards to the front of the cards i-- for removing cards till the game ends 
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      //in order to get a random card we will random index that is eariler in the deck of cards aka math.random, then we want to multiply it by 
      //i which is the current index + 1. This will give us a placement inside of our deck that is somewhere else 
      //to ensure it is an interger we will use math.floor 
      //changed to this.numberOfCards to go thru every card better 
      const newIndex = Math.floor(Math.random() * (this.numberOfCards));
      //now we want to flip the values at the new index with the current index,so we need the oldValue = basically the value currently at our newindex
      const oldValue = this.cards[newIndex];
      //now we need to take the card that is at our i index and put it where our new index is. 
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}


function freshDeck() {
  //using a flat map makes a nice and neat array rather than just map that will give you 4 seperate arrays 
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value);
    });
  });
}


function setupGame(player1, player2) {
  //create a deck 
  const deck = new Deck();
  //shuffles cards
  deck.shuffle();

  //splits deck of cards and gives a variable to use for splitting the deck
  const middleOfDeck = (deck.numberOfCards / 2);
  //this creates a deck thats already preshuffled (more information on the array slice method)
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice 
  player1.addNewDeck(deck.cards.slice(0, middleOfDeck));
  //since we only have the last 26 cards left we have to start from middleOfDeck-end aka deck.numberOfCards
  player2.addNewDeck(deck.cards.slice(middleOfDeck, deck.numberOfCards));
  //checking the shuffled decks of the players 

} 


function roundOutput(player1, player2, roundNum) {
  console.log(`${player1.name} plays: ${player1.playerDeck[roundNum].value} of ${player1.playerDeck[roundNum].suit}
  `);
  console.log(`${player2.name} plays: ${player2.playerDeck[roundNum].value} of ${player2.playerDeck[roundNum].suit}
  `);
}


function playRoundResults(player1, player2) {
  //changed to player1.playerDeck.length to create more tests
  for (let i = 0; i < player1.playerDeck.length; i++) {
      roundOutput(player1, player2, i);
    if (cardValueMap[player1.playerDeck[i].value] > cardValueMap[player2.playerDeck[i].value]) {
      player1.playerScore += 1;
      console.log(`${player1.name} has won this round`);
    } else if (cardValueMap[player1.playerDeck[i].value] < cardValueMap[player2.playerDeck[i].value]) {
      player2.playerScore += 1;
      console.log(`${player2.name} has won this round`);
    } else {
      console.log("This is a tie, no points rewarded");
    }
  }
}


function finalTally(player1, player2) {
  if (player1.playerScore > player2.playerScore) {
    console.log(`${player1.name} has won this round with a final score of: ${player1.playerScore}`);
  } else if (player1.playerScore < player2.playerScore) {
    console.log(`${player2.name} has won this round with a final score of: ${player2.playerScore}`);
  } else {
    console.log(`${player1.name} and ${player2.name} have tied!`);
  }
} 

let Madhu = new Player("Madhu");
let Praveen = new Player("Praveen");

//Needed to pass in Molly and Kelly once they were called outside of setupGame function to properly run
setupGame(Madhu, Praveen);

playRoundResults(Madhu, Praveen);

finalTally(Madhu, Praveen);



