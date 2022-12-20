
// Variables for the game
var currentMode, currentColor, currentSize;

// ---------- Setup the grid
const gamegrid = document.getElementById('game')

function createGame(size) {
    // Variable for drawing
    const drawing = false;

    gamegrid.style.display != 'grid'
    // Create the grid
    gamegrid.style.display = 'grid';
    gamegrid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    gamegrid.style.gridTemplateRows = `repeat(${size},1fr)`;

    // Fill with divs inside grid
    for (var i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item')
        gamegrid.appendChild(gridItem);
    }
    addEvLisforGame(drawing);
}


function addEvLisforGame() {
    // Click paint the current grid - Using event delegation
    // gamegrid.addEventListener('mouseover', (e) => {
    //     if (e.target.className == 'grid-item') {
    //         e.target.style.backgroundColor = 'black';
    //     }
    // });

}


function getCurrentSize() {
    // Create a list to represent the values of the list of the Select
    const listSelect = [16, 32, 64]
    // Get the select ID
    const gameToolSelect = document.getElementById('select');

    const selectItem = document.createElement('span');
    selectItem.className = 'selectItem no-select';
    selectItem.textContent = listSelect[0]

    gameToolSelect.append(selectItem)

    gameToolSelect.addEventListener('click', () => {
        selectItem.textContent == listSelect[0] ? selectItem.textContent = listSelect[1]
            : selectItem.textContent == listSelect[1] ? selectItem.textContent = listSelect[2]
                : selectItem.textContent = listSelect[0];
        gamegrid.innerHTML = '';
        currentSize = parseInt(selectItem.textContent);
        createGame(currentSize);
    });
    currentSize = parseInt(selectItem.textContent);
}


function getCurrentMode() {
    const gameTools = document.getElementById('game-tools')
    
    for (var i = 0; i < gameTools.children.length; i++) {
        if (gameTools.children[i].classList.contains('picked')) {
            if (gameTools.children[i].id == 'draw')
                console.log(gameTools.children[i])
        }
    }

}

function getCurrentColor() {

}

getCurrentSize();
getCurrentMode();
getCurrentColor();
createGame(currentSize);