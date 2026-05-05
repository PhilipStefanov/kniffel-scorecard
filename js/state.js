//stores all scores, no UI, no DOM, no logic
export const CATEGORIES = [
    "ones",
    "twos"
];

export const state = {
    players: [],
    currentPlayerIndex: 0,

    //scores[playerIndex][category]
    scores: []
};