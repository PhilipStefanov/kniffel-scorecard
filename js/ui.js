//reads input, updates DOM

const UI = (() => {

    function render(){
        renderControls();
        renderHeader();
        renderBody();
    }

    function renderHeader(){
        console.log("header");
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
            if (!State.hasStarted()){
                nameSpan.addEventListener('click', () => handleRenamePlayer(player.id, nameSpan));
            }
            

            const removeBtn = document.createElement('button');
            removeBtn.title = 'Remove Player';
            removeBtn.textContent = 'X';
            removeBtn.className = 'remove-player-btn';
            if (!State.hasStarted()){
                removeBtn.addEventListener('click', () => handleRemovePlayer(player.id));
            }
            else{
                removeBtn.classList.add('hidden');
            }
            

            th.appendChild(nameSpan);
            th.appendChild(removeBtn);
            tr.appendChild(th)
        });

        thead.appendChild(tr);
    }

    function renderBody(){
        console.log("body");
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
                
                const value = Scoring.resolveValue(cat, player);
                cell.textContent = value === null ? "" : String(value);
                
                if (cat.type === 'input' && State.hasStarted() && player === State.getCurrentPlayer()){
                    cell.addEventListener('click', () => handleInputCell(cat));
                }
                
                tr.append(cell);
                
            });
            tbody.appendChild(tr);
            
        });
    }

    function openPopup(){
        const popup = document.getElementById('scorePicker');
        popup.classList.remove('hidden');
    }

    function closePopup(){
        const popup = document.getElementById('scorePicker');
        popup.classList.add('hidden');

        //reset popupState
        popupState.playerID = null;
        popupState.categoryID = null;
        popupState.allowedValues = [];
    }

    function renderPopup(){
        const popup = document.getElementById('scorePicker');
        popup.innerHTML = '';

        popupState.allowedValues.forEach(value => {
            const btn = document.createElement('button');
            btn.textContent = String(value);
            btn.className = 'popup-score-btn';

            btn.addEventListener('click', () => {
                State.setScore(popupState.categoryID, value);
                closePopup();
                render();
            })

            popup.appendChild(btn);
        });

    }

    function handleInputCell(category){
        
        //popupState.playerID = playerID;
        popupState.categoryID = category.id;
        popupState.allowedValues = Scoring.getAllowedValues(category);

        openPopup();
        renderPopup();
        
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

    function handleStartGame(){
        State.startGame();
        render();
    }

    function handleEndGame(){
        State.resetGame();
        render();
    }

    function renderControls(){
        const addPlayerBtn = document.getElementById('addPlayerBtn');
        const endBtn = document.getElementById('endGame');
        const startGameBtn = document.getElementById('startGame');
        startGameBtn.classList.add('hidden');

        if (State.getPlayers().length > 0){
            startGameBtn.classList.remove('hidden');
        }

        if (!State.hasStarted()){
            addPlayerBtn.classList.remove('hidden');
            endBtn.classList.add('hidden');
        } else {
            addPlayerBtn.classList.add('hidden');
            endBtn.classList.remove('hidden');
        }
    }

    
    function init(){
        document.getElementById('addPlayerBtn').addEventListener('click', () => handleAddPlayer());
        document.getElementById('startGame').addEventListener('click', () => handleStartGame());
        document.getElementById('endGame').addEventListener('click', () => handleEndGame());

        render();
    }

    return { init, render };
})();

document.addEventListener('DOMContentLoaded', () => UI.init());