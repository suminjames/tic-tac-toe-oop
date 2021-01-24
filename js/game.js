class Game {
    constructor(totalRow, maxMove, minWinnerCheckMove) {
        this.totalRow = totalRow;
        this.maxMove = maxMove;
        this.minWinnerCheckMove = minWinnerCheckMove;
    }

    // start a game
    start() {
        let board = new Board(this.totalRow);
        board.clear();
        board.render();

        let pattern = new Pattern();
        pattern.getWinningPattern();

        let player = new Player();
        player.changeTurn();

        boxCollection.forEach(function (box) {
            box.boxObject.addEventListener('click', function () {
                if (!box.checked) {
                    box.handleClick(player);
                }
            })
        })
    }
}