"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardList = void 0;
const utils_1 = require("./utils");
const SUIT = ['♠', '♣', '♥', '♦'];
const VALUE = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
class Deck {
    constructor() {
        this.cards = [];
        this.cards = [];
        this.initializeDeck();
    }
    initializeDeck() {
        for (let i = 0; i < SUIT.length; i++) {
            for (let j = 0; j < VALUE.length; j++) {
                this.cards.push(SUIT[i] + VALUE[j]);
            }
        }
    }
}
const deck = new Deck();
exports.cardList = (0, utils_1.shuffleArray)(deck.cards);
