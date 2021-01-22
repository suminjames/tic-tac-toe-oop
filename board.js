var boxCollection = [];
var moveMadeCount = 0;
var winner = document.querySelector('.winner');
var winnerName = winner.querySelector('.winnerName');
var draw = document.querySelector('.draw');

class Box {
    constructor(rowCount) {
        this.rowCount = rowCount;
        this.boardRow = document.querySelector('#rowCount-' + this.rowCount);
        this.boxObject;
        this.checked = false;
    }

    render() {
        let thisBox = this;
        let box = document.querySelector('.box');
        this.boxObject = box.cloneNode(true);
        this.boxObject.classList.remove('d-none');

        boxCollection.push(this);

        this.boardRow.appendChild(this.boxObject);

        this.boxObject.addEventListener('click', function (e) {
            if (!thisBox.checked) {
                e.stopPropagation();
                thisBox.handleClick();
            }
        });
    }

    handleClick() {
        let player = new Player(this.rowCount);
        player.getSign();

        this.checked = true;
        this.boxObject.innerHTML = player.move;
        moveMadeCount += 1;

        if (player.isWinner()) {
            let view = new View();
            view.render();
            return false;
        }

        player.getSign();
    }
}

class View {
    // toggle turn to show whose turn is next
    togglePlayerActiveTurn(showPlayer, hidePlayer) {
        let activePlayer = showPlayer.querySelector('.activeCircle');
        let waitingPlayer = hidePlayer.querySelector('.activeCircle');
        if (activePlayer.classList.contains('invisible')) {
            activePlayer.classList.remove('invisible');
            waitingPlayer.classList.add('invisible');
        }
    }

    // show retry button
    showRetryButton(retryBtn) {
        retryBtn.classList.remove('d-none');
    }

    // remove active circle or player turn circle after game is completed
    removeActiveStatus() {
        document.querySelectorAll('.activeCircle').forEach(function (circle) {
            circle.classList.add('invisible');
        });
    }

    render() {
        let retryBtn = document.querySelector('.retryBtn');
        this.showRetryButton(retryBtn);
        this.removeActiveStatus();
    }

    // make the boxes as checked so that they can not be clicked
    checkRemainingBoxes() {
        boxCollection.forEach(function (box) {
            box.checked = !box.checked ? true : false
        });
    }

}

class BoxRow {
    constructor(board, rowCount) {
        this.rowCount = rowCount;
        this.board = board;
        this.boardRow;
    }

    render() {
        let row = this.board.querySelector('.boardRow');
        this.boardRow = row.cloneNode(true);
        this.boardRow.classList.remove('d-none');
        this.boardRow.classList.add('d-flex');
        this.boardRow.id = 'rowCount-' + this.rowCount;
        this.board.appendChild(this.boardRow);
    }
}

class Board {
    constructor(totalRow) {
        this.totalRow = totalRow;
    }

    render() {
        let board = document.querySelector('.board');
        for (let row = 0; row < this.totalRow; row++) {
            let boxRow = new BoxRow(board, row);
            boxRow.render();
            for (let j = 0; j < this.totalRow; j++) {
                let box = new Box(row);
                box.render();
            }
        }
    }

}

class Player {
    constructor() {
        this.move;
        this.detail = {
            'X': 'Player One', 'O': 'Player Two'
        };
        this.win = false;
        this.playerOne = document.querySelector('.playerOne');
        this.playerTwo = document.querySelector('.playerTwo');
        this.minWinnerCheckMove = getGameInstance().minWinnerCheckMove;
        this.totalRow = getGameInstance().totalRow;
    }

    getSign() {
        let view = new View();
        if (moveMadeCount % 2 == 0) {
            this.move = 'X';
            view.togglePlayerActiveTurn(this.playerOne, this.playerTwo);
        } else {
            this.move = 'O';
            view.togglePlayerActiveTurn(this.playerTwo, this.playerOne);
        }
    }

    isWinner() {
        let resetGame = false;
        let view = new View();
        if (moveMadeCount > this.minWinnerCheckMove) {
            this.checkWinningPattern();

            if (!this.win && moveMadeCount == maxMove) {
                draw.classList.remove('d-none');
                resetGame = true;
            } else if (this.win) {
                this.declareWinner();
                view.checkRemainingBoxes();
                resetGame = true;
            }
        }
        return resetGame;
    }

    // check if there is a win, depending on the matched winning patterns
    checkWinningPattern() {
        for (let pattern of winningPattern) {
            let sameElement = false;
            let initialElement = boxCollection[pattern[0]].boxObject.innerHTML;
            for (let i = 1; i < this.totalRow; i++) {
                let nextElement = boxCollection[pattern[i]].boxObject.innerHTML;
                if (initialElement == nextElement && initialElement != "") {
                    sameElement = true;
                    initialElement = nextElement
                } else {
                    sameElement = false;
                    break;
                }
            }
            if (sameElement) {
                this.win = true;
                break;
            }
        }
    }

    // declare winner(show the winner name)
    declareWinner() {
        winner.classList.remove('d-none');
        winnerName.innerHTML = this.detail[this.move] + ' (' + this.move + ')';
    }
}

function startGame() {
    let totalRow = getGameInstance().totalRow;
    clearBoard();
    let board = new Board(totalRow);
    board.render();

    let pattern = new Pattern();
    pattern.getWinningPattern();
}

function clearBoard() {
    let board = document.querySelector('.board');
    console.log(board);
    board.removeChild();
}