//only calculation logic
import { CATEGORIES, state } from "./state.js";

export function addPlayer(name){
    state.players.push(name);
    state.scores.push(
        CATEGORIES.map(() => null)
    );
}

export function nextPlayer(){
    state.currentPlayerIndex = 
        (state.currentPlayerIndex + 1) % state.players.length
}

export function setScore(category, value){
    const player = state.currentPlayerIndex;
    const categoryIndex = CATEGORIES.indexOf(category)
    state.scores[player][categoryIndex] = value;
}

