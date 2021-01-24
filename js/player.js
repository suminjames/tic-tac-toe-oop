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
        this.maxMove = getGameInstance().maxMove;
    }

    // change player turn after move made
    changeTurn() {
        let view = new View();

        if (moveMadeCount % 2 == 0) {
            this.move = 'X';
            view.togglePlayerActiveTurn(this.playerOne, this.playerTwo);
        } else {
            this.move = 'O';
            view.togglePlayerActiveTurn(this.playerTwo, this.playerOne);
        }
    }

    // to check if the player win
    isWinner() {
        let resetGame = false;
        if (moveMadeCount > this.minWinnerCheckMove) {
            this.checkWinningPattern();

            if (!this.win && moveMadeCount == this.maxMove) {
                draw.classList.remove('d-none');
                resetGame = true;
            } else if (this.win) {
                this.declareWinner();
                let view = new View();
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