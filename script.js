document.addEventListener('DOMContentLoaded', () => {

    const grid = document.getElementById('grid');
    let squares = [];
    function createBoard() {
        for (let i = 0; i < 9; i++) {
            sqaure = document.createElement('div');
            sqaure.setAttribute('class', 'cell');
            sqaure.setAttribute('id', i);
            sqaure.innerHTML = '';
            grid.appendChild(sqaure);
            squares.push(sqaure);
        }
    }

    createBoard();

    let currPlayer = 'X';
    let prevPlayer = '';
    // let gameBoard = ['', '', '', '', '', '', '', '', '',];
    let gameActive = true;

    function playerTurn(cellIndex) {
        if (squares[cellIndex].innerHTML !== '' || !gameActive)
            return;
        squares[cellIndex].innerHTML = currPlayer;
        prevPlayer = currPlayer;
        currPlayer = (currPlayer === 'X') ? 'O' : 'X';
    }

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', cellClicked, false);
    });

    function cellClicked(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const cellIndex = parseInt(clickedCell.id);
        if (squares[cellIndex].innerHTML !== '' || !gameActive)
            return;
        playerTurn(cellIndex);
        updateUI();
        checkWin();
    }

    function updateUI() {
        for (let i = 0; i < cells.length; i++)
            cells[i].innerHTML = squares[i].innerHTML;
    }

    const winCond = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    function checkWin() {
        let win = false;
        for (let i = 0; i < winCond.length; i++) {
            const [a, b, c] = winCond[i];
            if (squares[a].innerHTML && squares[a].innerHTML === squares[b].innerHTML && squares[a].innerHTML === squares[c].innerHTML) {
                win = true;
                break;
            }
        }
        if (win) {
            document.getElementById('result').innerText = `Winner is ${prevPlayer}`;
            gameActive = false;
            return;
        }
        let draw = !squares.innerHTML.includes('');
        if (draw) {
            document.getElementById('result').innerText = `Match Draw!`;
            gameActive = false;
            return;
        }
    }
})

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var minibut = document.getElementById("minibut");
    if (sidebar.style.width === "135px") {
        sidebar.style.width = "0px";
        minibut.style.left = "5px";
    }
    else {
        sidebar.style.width = "135px";
        minibut.style.left = "135px";
    }
}

function reset() {
    var res = confirm('Warning! All Your Progress will be lost!');
    if (res)
        window.location.reload();
}