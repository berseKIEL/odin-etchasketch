
// Variables for the game
var currentMode, currentColor, currentSize;

// ---------- Setup the grid
const gamegrid = document.getElementById('game')

function createGame(size) {
    // Create the grid
    gamegrid.style.display = 'grid';
    gamegrid.classList.add('no-select')
    gamegrid.style.gridTemplateColumns = `repeat(${size},1fr)`;
    gamegrid.style.gridTemplateRows = `repeat(${size},1fr)`;

    // Fill with divs inside grid
    for (var i = 0; i < size * size; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item')
        gamegrid.appendChild(gridItem);
    }
}


function addEvLisforGame() {
    var condition = false;

    // Click paint the current grid - Using event delegation
    gamegrid.addEventListener('mouseover', (e) => {
        if (e.target.className == 'grid-item') {
            if (!condition) return;
            if (currentMode == 'draw') {
                e.target.style.backgroundColor = currentColor;
            }
            else if (currentMode == 'eraser') {
                e.target.style.backgroundColor = 'transparent';
            }
        }
    });

    // Event Listeners for the game
    gamegrid.addEventListener('mousedown', (e) => {
        if (currentMode == 'draw')
            e.target.style.backgroundColor = currentColor;
        else if (currentMode == 'eraser') {
            e.target.style.backgroundColor = 'transparent';
        }
    })

    window.addEventListener('mousedown', () => {
        condition = true;
    });

    window.addEventListener('mouseup', () => { condition = false })

    // Screen Cleaner
    const screenCleaner = document.getElementById('screen-cleaner')
    screenCleaner.addEventListener('click', (e) => {
        if (confirm("Are you sure you want to clear the Screen?")) {
            clearGrid()
        }
        else {
            e.preventDefault();
        }
    })
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

    gameToolSelect.addEventListener('click', (e) => {
        if (confirm('Are you sure you want to change the grid Size? \nYou\'ll lose your draw')) {
            selectItem.textContent == listSelect[0] ? selectItem.textContent = listSelect[1]
                : selectItem.textContent == listSelect[1] ? selectItem.textContent = listSelect[2]
                    : selectItem.textContent = listSelect[0];
            clearGrid(selectItem.textContent)
        }
        else {
            e.preventDefault();
        }
    });
    currentSize = parseInt(selectItem.textContent);
}

// Get current mode
function getCurrentMode() {
    const gameTools = document.getElementById('game-tools')

    var picked = document.getElementsByClassName('picked')[0];

    currentMode = picked.id;

    gameTools.addEventListener('click', (e) => {
        if (e.target.classList.contains('tool')) {
            if (!e.target.parentElement.classList.contains('picked') && (e.target.parentElement.id == 'draw' || e.target.parentElement.id == 'eraser')) {
                document.getElementsByClassName('picked')[0].classList.remove('picked');
                e.target.parentElement.classList.add('picked');
                picked = document.getElementsByClassName('picked')[0];
                currentMode = picked.id;
            }
        }
        else {
            if (!e.target.classList.contains('picked') && (e.target.id == 'draw' || e.target.id == 'eraser')) {
                document.getElementsByClassName('picked')[0].classList.remove('picked');
                e.target.classList.add('picked');
                picked = document.getElementsByClassName('picked')[0];
                currentMode = picked.id;
            }
        }
    })
}

// Get current Colors
function getCurrentColor() {
    const colorPicker = document.getElementById('color-picker');

    currentColor = colorPicker.value;

    colorPicker.addEventListener("input", () => {
        currentColor = colorPicker.value;
    })
}

// Clear the grid
function clearGrid(size) {
    if (size == undefined) {
        gamegrid.innerHTML = '';
        createGame(currentSize);
    }
    else {
        gamegrid.innerHTML = '';
        currentSize = parseInt(size);
        createGame(currentSize);
    }
}

// Call functions
getCurrentSize();
getCurrentMode();
getCurrentColor();
addEvLisforGame();
createGame(currentSize);