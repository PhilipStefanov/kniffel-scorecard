//reads input, updates DOM

const UI = (() => {

    function render(){
        renderHeader();
        renderBody();
    }

    function renderHeader(){
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

    function renderBody(){
        const players = State.getPlayers();
        const tbody = document.getElementById('scorecardBody');
        tbody.innerHTML = '';

        CATEGORIES.forEach(cat => {
            const tr = document.createElement('tr');

            const cat_cell = document.createElement('td');
            cat_cell.textContent = cat.label;
            cat_cell.className = 'category-column';

            tr.appendChild(cat_cell);

            players.forEach(player => {
                const cell = document.createElement('td');
                cell.className = 'score-cell';
                
                const value = State.getScore(player.id, cat.id);
                cell.textContent = value ?? '-';
                
                if (cat.type === 'input'){
                    cell.addEventListener('click', () => handleInputCell(cat.id, player.id));
                } //else {
                    //cell.addEventListener('click', () => handleCalcCell(cat, player));
                //}
                
                tr.append(cell);
                
            });
            tbody.appendChild(tr);
            
        })
    }

    function handleInputCell(categoryID, playerID){
        const input = prompt('Gib Punkte ein:');
        const value = Number(input);
        State.setScore(playerID, categoryID, value);
        render();

    }

    function handleCalcCell(categoryID, player){

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