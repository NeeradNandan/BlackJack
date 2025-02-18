import { shuffleArray } from './utils'

const SUIT: Readonly <string[]> = ['♠', '♣', '♥', '♦'];
const VALUE: Readonly <string[]> = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

class Deck {
    readonly cards: string[] = [];

    constructor () {
        this.cards = [];
        this.initializeDeck ();
    }

    private initializeDeck () {
        for ( let i: number = 0; i < SUIT.length; i ++ ) {
            for ( let j: number = 0; j < VALUE.length; j ++ ) {
                this.cards.push ( SUIT[ i ] + VALUE[ j ] );
            }
        }
    }
}

const deck = new Deck();
export const cardList: string[] = shuffleArray(deck.cards);


