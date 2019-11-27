var deck = [
    /* Array that contains the main deck */
    'AC', '2C', '3C', '4C', '5C', '6C', '7C', '8C', '9C', '10C', 'JC', 'QC', 'KC',
    'AD', '2D', '3D', '4D', '5D', '6D', '7D', '8D', '9D', '10D', 'JD', 'QD', 'KD',
    'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', 'JH', 'QH', 'KH',
    'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '10S', 'JS', 'QS', 'KS'
];
/* The two decks containing a subset of X cards*/
var deck1 = [];
var deck2 = [];
/* the arrays that comntain the cards that have been matched so far*/
var deckmatched = [];
var deck2matched = []; //TODO: Delete one of the 2 arrays
/* Variables that contain the value of the card picked from each deck*/
var deck1flipped = '';
var deck2flipped = '';
/*Variables that identify the two divs for the deks */
/*
       Initalize a new game
        */
function startGame() {
    /* Get the difficulty of the game */
    var element = document.getElementById('difficulty');
    var value = element.options[element.selectedIndex].value;
    var deck1div = document.getElementById('deck1');
    var deck2div = document.getElementById('deck2');
    deck1div.innerHTML = '';
    deck2div.innerHTML = '';
    console.log(value);
    deck = shuffle(deck);
    deck1 = [];
    deck2 = [];
    deckmatched = [];
    deckmatched = [];
    deck1flipped = '';
    deck2flipped = '';
    for (i = 0; i < value; i++) {
        deck1.push(deck[i]);
        deck2.push(deck[i]);
    }
    console.log(deck1);
    console.log(deck2);
    shuffle(deck2);

    for (i = 0; i < value; i++) {
        card1 = '<div class="col-3 mb-2"><img class="card" data-card="' + deck1[i] + '" src="img/red_back.png" style="width:100%" /></div>';
        card2 = '<div class="col-3 mb-2"><img class="card" data-card="' + deck2[i] + '" src="img/yellow_back.png" style="width:100%" /></div>';
        deck1div.innerHTML += card1;
        deck2div.innerHTML += card2;
    }
}

document.getElementById("deck1").addEventListener('click', function(event) {
    if (event.target.getAttribute('data-card') == undefined) return;
    deck1flipped = event.target.getAttribute('data-card');
    console.log("deck1flipped - " + deck1flipped);
    console.log("deck2flipped - " + deck2flipped);
    flipDeck('deck1', event.target.getAttribute('data-card'), 'red_back');
    event.target.src = 'img/' + event.target.getAttribute('data-card') + '.png';
    if (deck2flipped.length > 0) {
        if (deck2flipped == deck1flipped) {
            deckmatched.push(event.target.getAttribute('data-card'));
            deckmatched.push(event.target.getAttribute('data-card'));
            /* clear the flipped card */
            deck1flipped = '';
            deck2flipped = '';
            checkendgame();
        } else {
            /*flip cards after 1000 milliseconds*/
            setTimeout(function() {
                /*flip the card that hasnt been matched*/
                deck1flipped = '';
                deck2flipped = '';
                flipUnmatchedCards('deck1', 'red_back');
                flipUnmatchedCards('deck2', 'yellow_back');
            }, 1000);
        }
    }
    console.log(event.target.getAttribute('data-card'));
});

document.getElementById("deck2").addEventListener('click', function(event) {
    if (event.target.getAttribute('data-card') == undefined) return;
    deck2flipped = event.target.getAttribute('data-card');
    console.log("deck1flipped - " + deck1flipped);
    console.log("deck2flipped - " + deck2flipped);
    flipDeck('deck2', event.target.getAttribute('data-card'), 'yellow_back');
    event.target.src = 'img/' + event.target.getAttribute('data-card') + '.png';
    if (deck1flipped.length > 0) {
        if (deck2flipped == deck1flipped) {
            deckmatched.push(event.target.getAttribute('data-card'));
            deck1matched.push(event.target.getAttribute('data-card'));
            /* clear the flipped card */
            deck1flipped = '';
            deck2flipped = '';
        } else {
            /*flip cards after 1000 milliseconds*/
            setTimeout(function() {
                deck1flipped = '';
                deck2flipped = '';
                flipUnmatchedCards('deck1', 'red_back');
                flipUnmatchedCards('deck2', 'yellow_back');
            }, 1000);
        }
    }
    console.log(event.target.getAttribute('data-card'));
});
/*you won */
function checkendgame() {
    setTimeout(function() {
        if (deck.length == deckmatched.lemgth) {
            alert('congratulations you won!');
            1000;
        }
    })
}

function flipDeck(deck, selectedCard = '', back = '') {
    var deck = document.getElementById(deck);
    var cards = deck.getElementsByClassName('card');
    var currentCard;
    for (i = 0; i < cards.length; i++) {
        currentCard = cards[i].getAttribute('data-card');

        if (deck == 'deck1') {
            if (currentCard != selectedCard && !deck1matched.includes(currentCard)) cards[i].src = 'img/' + back + '.png';
        } else {
            if (currentCard != selectedCard && !deckmatched.includes(currentCard)) cards[i].src = 'img/' + back + '.png';
        }
    }
}
/* Flip all the cards that have not yet been matched*/
function flipUnmatchedCards(deck, back = '') {
    var deck = document.getElementById(deck);
    var cards = deck.getElementsByClassName('card');
    for (i = 0; i < cards.length; i++) {
        /*het value of the card */
        currentCard = cards[i].getAttribute('data-card');
        /*check if the card has been matched so we dont flip it */
        if (deck == 'deck1') {
            if (!deckmatched.includes(currentCard)) cards[i].src = 'img/' + back + '.png';
        } else {
            if (!deckmatched.includes(currentCard)) cards[i].src = 'img/' + back + '.png';
        }
    }
}