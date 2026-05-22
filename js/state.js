//stores all scores, no UI, no DOM, no logic
const CATEGORIES = [
    {id: 'ones', label: 'Einser', type: 'input', val: '1', section: 'upper'},
    {id: 'twos', label: 'Zweier', type: 'input', val: '2', section: 'upper'},
    {id: 'threes', label: 'Dreier', type: 'input', val: '3', section: 'upper'},
    {id: 'fours', label: 'Vierer', type: 'input', val: '4', section: 'upper'},
    {id: 'fives', label: 'Fünfer', type: 'input', val: '5', section: 'upper'},
    {id: 'sixes', label: 'Sechser', type: 'input', val: '6', section: 'upper'},
    {id: 'gesamt', label: 'Gesamt oberer Teil', type: 'calc'},
    {id: 'bonus', label: 'Bonus', type: 'calc'},
    {id: 'upper-total', label: 'Gesamt Up', type: 'calc'},
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
    let nextID = 1;

    /*
    player = {
        id: 1,
        name: Philip,
        scores = {ones: 3, fullHouse: 25}
    }
    */

    function addPlayer(name){
        players.push({
            id: nextID, 
            name: name, 
            scores: {} 
        });
        nextID++;
    }



    function setScore(playerID, categoryID, value){
        const player = players.find(p => p.id === playerID); //find player with matching id
        if (!player) return; //if no player exists, stop
        player.scores[categoryID] = value;
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

    return { addPlayer, setScore, removeScore, getPlayers, getScore, renamePlayer, removePlayer };
})();

const popupState = {
    visible: true,
    playerID: null,
    categoryID: null,
    allowedValues: []
}
