/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] === 1 || grid[colIdx][rowIdx] === 2) 
        return;

    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    compsMove(colIdx, rowIdx);
    renderMainGrid();
    addClickHandlers();
    status()
}

function compsMove(col, row) {
    const random1 = Math.floor(Math.random() * Math.floor(3));
    const random2 = Math.floor(Math.random() * Math.floor(3));
    if(grid[random1][random2] === 0) {
        grid[random1][random2] = 2;       
    }
    else {
        for (let j = 0; j < grid.length; j++) {
            for (let i = 0; i < 3; i++) {
                if(grid[i][j] === 0) {
                    grid[i][j] = 2
                    return
                }
            }
        }
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function status() {
    for (let j = 0; j < 3; j++) {
        if(grid[j][0] !== 0 && grid[j][0] === grid[j][1] && grid[j][1] === grid[j][2]) {
            win(grid[j][0])
            return
        }
        if(grid[0][j] !== 0 && grid[0][j] === grid[1][j] && grid[1][j] === grid[2][j]) {
            win(grid[0][j])
            return
        }
    }
    if(grid[0][0] !== 0 && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        win(grid[0][0])
        return
    }
    if(grid[2][0] !== 0 && grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) {
        win(grid[2][0])
        return
    }
}

function win(who) {
    let winner = who === 1 ? 'User' : 'Computer'
    setTimeout(() => {
        alert( winner + ' Wins')
        reset()
    }, 100);
}

function reset() {
    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < 3; i++) {
            grid[i][j] = 0
        }
    }
    renderMainGrid()
    addClickHandlers();
}

initializeGrid();
renderMainGrid();
addClickHandlers();
