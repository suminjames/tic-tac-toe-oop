class Game {
    constructor(totalRow, maxMove, minWinnerCheckMove) {
        this.totalRow = totalRow;
        this.maxMove = maxMove;
        this.minWinnerCheckMove = minWinnerCheckMove;
        this.moveMadeCount = 0;
    }

    start() {
        let board = new Board(this.totalRow);
        board.clear();
        board.render();

        let pattern = new Pattern();
        pattern.getWinningPattern();
    }

}