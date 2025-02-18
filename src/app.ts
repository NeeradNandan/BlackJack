import promptSync from 'prompt-sync';
import { cardList } from "./deck";

const prompt = promptSync();

let balance = 100;


function gameStats (playerHand: string[], dealerHand: string[], showDealerHand: boolean) {
    console.log ('\nDealer\'s hand:' );
    if (showDealerHand) {
        console.log (`\n ${dealerHand}`)
    } else {
        console.log (`\n ${dealerHand[0]} [Hidden]`)
    }

    console.log ('\nYour Hand:');
    console.log (`\n ${playerHand}\n`);
}

function calculateHandValue (hand: string[]) {
    let value = 0;
    let aces = 0;
    for (let i = 0; i < hand.length; i++) {
        const faceValue = hand[i].slice(1);

        if (['K', 'Q', 'J'].includes(faceValue)) {
            value += 10;
        } else if (faceValue === 'A') {
            value += 11;
            aces += 1;
        } else {
            value += parseInt(faceValue, 10);
        }
    }
    while (value > 21 && aces > 0) {
        value -= 10;
        aces -= 1;
    }
    return value
}

let playerBusted = false;

while (balance > 0 && !playerBusted) {

    let dealerHand = cardList.splice (-2, 2);
    let playerHand = cardList.splice(-2, 2);
    let remainingCards: string[] = cardList;

    const bet = Number(prompt('How much will you bet?'));

    if ( bet > 0 && bet <= balance ) {

        let playerHandValue = calculateHandValue(playerHand);
        let dealerHandValue = calculateHandValue(dealerHand);

        while ( playerHandValue <= 21 ) {

            gameStats ( playerHand, dealerHand, false );
            console.log ( `\nYour Hand Value: ${ playerHandValue } \n` );

            const action = prompt('Do you want to (h)it ot (s)tand?');

            if (action === 'h') {
                playerHand.push(remainingCards.pop()!);
                playerHandValue = calculateHandValue(playerHand);
                console.log (`Your hand: ${playerHand} and value: ${playerHandValue}`);
            } else if (action === 's') {
                console.log ('\nYou chose to stand! \n');
                break;
            }
        }

        while (dealerHandValue < 17) {
            console.log ('\nDealer draws a card\n')
            dealerHand.push(remainingCards.pop()!);
            dealerHandValue = calculateHandValue(dealerHand);
        }

        gameStats(playerHand, dealerHand, true);
        console.log (`Your Hand Value: ${playerHandValue}\n`);
        console.log (`Dealer's Hand Value: ${dealerHandValue}\n`);

        if (playerHandValue > 21) {
            console.log ('\nBust! You lost!\n');
            balance -= bet;
            console.log (`Final Balance: ₹${balance}`);
        } else if (dealerHandValue > 21 || playerHandValue > dealerHandValue ) {
            console.log ('\nYou won!\n');
            balance += bet;
            console.log (`Final Balance: ₹${balance}`);
        } else if (dealerHandValue > playerHandValue) {
            console.log ('\nYou lost!\n');
            balance -= bet;
            console.log (`Final Balance: ₹${balance}`);
        } else if (playerHandValue === 21) {
            console.log ('\nBlackJack! You won!\n');
            balance += 1.5 * bet;
            console.log (`Final Balance: ₹${balance}`);
        } else if (playerHandValue === dealerHandValue && playerHandValue <= 21 && dealerHandValue <= 21) {
            console.log ('\nPush! It"s a tie\n');
            console.log (`Final Balance: ₹${balance}`);
        }
    } else {
        console.log ('Your betting amount should be a number greater than zero\n')
        playerBusted = true;
    }
}









