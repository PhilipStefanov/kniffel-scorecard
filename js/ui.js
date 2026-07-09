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
        
        const players = State.getPlayers();
        const tbody = document.getElementById('scorecardBody');
        tbody.innerHTML = '';

        CATEGORIES.forEach(cat => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-cat', cat.id);
            const cat_cell = document.createElement('td');
            cat_cell.textContent = cat.label;
            cat_cell.className = 'category-column';

            tr.appendChild(cat_cell);

            players.forEach(player => {
                const cell = document.createElement('td');
                
                const cellTypeClass = cat.type === 'calc' ? 'calc-cell' : 'input-cell';
                cell.className = `score-cell ${cellTypeClass}`;
                
                if (State.hasStarted() && player === State.getCurrentPlayer()) {
                    cell.classList.add('active-player-cell');
                }
                
                const value = Scoring.resolveValue(cat, player);
                cell.textContent = value === null ? "" : String(value);
                
                if (cat.type === 'input' && State.hasStarted() && !State.hasGameEnded() && ((player === State.getCurrentPlayer() && player.scores[cat.id] === null) || State.canEditScore(player.id, cat.id))){
                    cell.addEventListener('click', () => handleInputCell(player.id, cat));
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
                if (State.canEditScore(popupState.playerID, popupState.categoryID)){
                    State.updateLastScore(value);
                } else {
                    State.setScore(popupState.categoryID, value);
                }
                closePopup();
                render();
                
                if (State.hasGameEnded()){
                    showGameOver();
                    openOverlay();
                } 
            })

            popup.appendChild(btn);
        });

    }
    function hideGameOver(){
        const overlay = document.getElementById('gameOverOverlay');
        overlay.classList.add('hidden');

    }

    function openOverlay(){
        const overlay = document.getElementById('gameOverOverlay');
        overlay.classList.remove('hidden');
    }

    function showGameOver(){
        const rankingList = document.getElementById('rankingList');
        rankingList.innerHTML = '';

        const ranking = State.getRanking();
        let place = 0;
        ranking.forEach(entry => {
            place++;
            const row = document.createElement('div');
            row.className = 'ranking-row';

            const position = document.createElement('span');
            position.textContent = String(place);

            const name = document.createElement('span');
            name.textContent = entry.name;

            const score = document.createElement('span');
            score.textContent = String(entry.points);

            row.appendChild(position);
            row.appendChild(name);
            row.appendChild(score);

            rankingList.appendChild(row);

        });

        const close_btn = document.getElementById('gameOverBtn');
        close_btn.textContent = 'Start again';
        close_btn.className = 'gameOverOverlayBtn';

        close_btn.addEventListener('click', () => {
            hideGameOver();
            handleEndGame();
        });

    }

    function handleInputCell(playerID, category){
        
        popupState.playerID = playerID
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