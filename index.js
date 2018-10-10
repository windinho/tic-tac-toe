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
var GRID_LENGTH = 3;
let turn = 'X';
document.getElementById('len').onchange = function(e) {
    GRID_LENGTH = this.value;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

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
    const random1 = Math.floor(Math.random() * Math.floor(GRID_LENGTH));
    const random2 = Math.floor(Math.random() * Math.floor(GRID_LENGTH));
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
    var line = [0, 0, 0, 0]
    var cross = [0, 0, 0, 0]
    for (let i = 0; i < GRID_LENGTH * 1; i++) {
        for (let j = 0; j < GRID_LENGTH * 1; j++) {
            let gridij = grid[i][j];
            let gridji = grid[j][i];
            (gridij === 1) ? line[0] += gridij : (gridij === 2) ? line[1] += gridij : 0;
            (gridji === 1) ? line[2] += gridji : (gridji === 2) ? line[3] += gridji : 0;
            if(i+j === GRID_LENGTH-1) {
                (gridji === 1) ? cross[2] += gridji : (gridji === 2) ? cross[3] += gridji : 0;
            }
            if(i === j) {
                (gridij === 1) ? cross[0] += gridij : (gridij === 2) ? cross[1] += gridij : 0;
            }
        }
        if (line[0] === GRID_LENGTH * 1 || line[2] === GRID_LENGTH * 1) {
            win(1);
            return;
        }
        else if (line[1] === GRID_LENGTH * 2 || line[3] === GRID_LENGTH * 2) {
            win(2);
            return;
        }
        line = [0, 0, 0, 0];
    }
    if (cross[0] === GRID_LENGTH * 1 || cross[2] === GRID_LENGTH * 1) {
        win(1);
        return;
    }
    else if (cross[1] === GRID_LENGTH * 2 || cross[3] === GRID_LENGTH * 2) {
        win(2);
        return;
    }
    cross = [0, 0, 0, 0];
}

function win(who) {
    let winner = who === 1 ? 'User' : 'Computer'
    setTimeout(() => {
        alert( winner + ' Wins')
        reset()
    }, 100);
}

function reset() {
    for (let j = 0; j < GRID_LENGTH; j++) {
        for (let i = 0; i < GRID_LENGTH; i++) {
            grid[i][j] = 0
        }
    }
    renderMainGrid()
    addClickHandlers();
}

initializeGrid();
renderMainGrid();
addClickHandlers();
