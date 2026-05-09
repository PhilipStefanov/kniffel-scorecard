//stores all scores, no UI, no DOM, no logic
const CATEGORIES = [
    {id: 'ones', label: 'Einser', type: 'input'},
    {id: 'twos', label: 'Zweier', type: 'input'},
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

