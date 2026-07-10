//stores all scores, no UI, no DOM, no logic
const CATEGORIES = [
    {id: 'ones', label: 'Einser', type: 'input', val: '1', section: 'upper'},
    {id: 'twos', label: 'Zweier', type: 'input', val: '2', section: 'upper'},
    {id: 'threes', label: 'Dreier', type: 'input', val: '3', section: 'upper'},
    {id: 'fours', label: 'Vierer', type: 'input', val: '4', section: 'upper'},
    {id: 'fives', label: 'Fünfer', type: 'input', val: '5', section: 'upper'},
    {id: 'sixes', label: 'Sechser', type: 'input', val: '6', section: 'upper'},
    {id: 'gesamt', label: 'Gesamt', type: 'calc'},
    {id: 'bonus', label: 'Bonus', type: 'calc'},
    {id: 'upper-total', label: 'Gesamt oberer Teil', type: 'calc'},
    {id: 'three-oak', label: 'Dreierpasch', type: 'input', section: 'lower'},
    {id: 'four-oak', label: 'Viererpasch', type: 'input', section: 'lower'},
    {id: 'fullhouse', label: 'Full House', type: 'input', section: 'lower'},
    {id: 'smallStreet', label: 'Kleine Straße', type: 'input', section: 'lower'},
    {id: 'bigStreet', label: 'Große Straße', type: 'input', section: 'lower'},
    {id: 'kniffel', label: 'Kniffel', type: 'input', section: 'lower'},
    {id: 'chance', label: 'Chance', type: 'input', section: 'lower'},
    {id: 'gesamtUnten', label: 'Gesamt unterer Teil', type: 'calc'},
    {id: 'total', label: 'Gesamte Punktezahl', type: 'calc'}
];

const State = (() => {

    let players = [];
    let currentPlayerIndex = 0;
    let nextID = 0;
    let started = false;
    let moveHistory = [];

    function initEmptyScores(){
        let scores = {};
        CATEGORIES.forEach((cat) => {
            if (cat.type === 'input'){
                scores[cat.id] = null;
            }
        });

        return scores;
    }

    function addPlayer(name){
        players.push({
            id: nextID, 
            name: name, 
            scores: initEmptyScores() 
        });
        nextID++
    }

    function getCurrentPlayer(){
        return players[currentPlayerIndex];
    }

    function startGame(){
        started = true;
    }

    function hasStarted(){
        return started;
    }

    function resetGame(){
        started = false;
        currentPlayerIndex = 0;
        moveHistory = [];

        for (const player of players){
            player.scores = initEmptyScores();
        }
    }

    function hasGameEnded(){
        let size = moveHistory.length;
        let p_size = players.length;

        if (size === p_size * 13){
            return true;
        }

        return false;
    }

    function getRanking(){
        let ranking = [];

        players.forEach(player => {
            ranking.push({
                name: player.name,
                points: Scoring.totalScore(player)
            })
        });

        ranking.sort((a,b) => b.points - a.points);

        return ranking;

    }

    function setScore(categoryID, value){
        player = getCurrentPlayer();

        if (player.scores[categoryID] != null){
            return false;
        }

        player.scores[categoryID] = value;

        moveHistory.push({
            playerID: player.id,
            categoryID,
            value
        })

        currentPlayerIndex++;
         //loop back to first player
        if (currentPlayerIndex === players.length){
            currentPlayerIndex = 0;
        }
        return true;
    }

    function canEditScore(playerID, categoryID){
        if (moveHistory.length === 0){
            return false;
        }
        let size = moveHistory.length;
        let lastMove = moveHistory[size - 1];

        return (lastMove.playerID === playerID && lastMove.categoryID === categoryID);
    }

    function updateLastScore(value){
        if (moveHistory.length == 0){
            return false;
        }

        let size = moveHistory.length;
        let lastMove = moveHistory[size - 1];

        const player = players.find(p => p.id === lastMove.playerID);
        player.scores[lastMove.categoryID] = value;
        lastMove.value = value;

        return true;
    }

    function getScore(playerID, categoryID){
        const player = players.find(p => p.id === playerID);
        if (!player) return;
        return player.scores[categoryID];
    }

    function removeScore(playerID, categoryID){
        const player = players.find(p => p.id === playerID);
        if (!player) return;
        delete player.scores[categoryID];
    }

    function renamePlayer(playerID, newName){
        const player = players.find(p => p.id === playerID);
        if (!player) return;
        player.name = newName;
    }

    function removePlayer(playerID){
        players = players.filter(p => p.id !== playerID);
    }

    function getPlayers(){
        return players;
    }

    return { addPlayer, setScore, removeScore, getPlayers, getScore, renamePlayer, removePlayer, hasStarted, startGame, resetGame, getCurrentPlayer, canEditScore, updateLastScore, hasGameEnded, getRanking };
})();

const popupState = {
    playerID: null,
    visible: true,
    categoryID: null,
    allowedValues: []
}
