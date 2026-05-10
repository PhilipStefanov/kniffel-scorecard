//reads input, updates DOM

const UI = (() => {

    function render(){
        const thead = document.getElementById("playerHeader");
        const players = State.getPlayers();
        thead.innerHTML = '';

        const tr = document.createElement('tr');

        //corner cell
        const corner = document.createElement('th');
        corner.className = 'category-column';
        tr.appendChild(corner);

        players.forEach(player => {
            const th = document.createElement('th');
            th.className = 'player-col';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = player.name;
            nameSpan.title = 'Klicken zum umbennen';
            nameSpan.addEventListener('click', () => handleRenamePlayer(player.id, nameSpan));

            const removeBtn = document.createElement('button');
            removeBtn.title = 'Remove Player';
            removeBtn.textContent = 'X';
            removeBtn.className = 'remove-player-btn';
            removeBtn.addEventListener('click', () => handleRemovePlayer(player.id))

            th.appendChild(nameSpan);
            th.appendChild(removeBtn);
            tr.appendChild(th)
        });

        thead.appendChild(tr);
    }


    function handleRenamePlayer(playerID, nameSpan){
        const current = nameSpan.textContent;
        const name = prompt('Neuer Name:', current);
        if (!name || !name.trim() || name.trim() === current) return;
        State.renamePlayer(playerID, name.trim());
        render();
    }

    function handleAddPlayer(){
        const name = prompt('Spielername:')
        if (!name || !name.trim()) return;
        State.addPlayer(name.trim());
        render();
    }

    function handleRemovePlayer(playerID){
        State.removePlayer(playerID);
        render();
    }

    function init(){
        document.getElementById('addPlayerBtn').addEventListener('click', () => handleAddPlayer());

        render();
    }

    return { init, render };
})();

document.addEventListener('DOMContentLoaded', () => UI.init());