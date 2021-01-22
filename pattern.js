var winningPattern = [];

class Pattern {
    constructor(){
        this.totalRow = getGameInstance().totalRow;
    }

    // get horizontal winning pattern which can be used to check the winner
    getHorizontalPattern() {
        let increaseBy = 0;
        let matchingPattern = [];
        for (let i = 0; i < this.totalRow; i++) {
            let horizontalMatchPattern = [];
            for (let row = 0; row < this.totalRow; row++) {
                horizontalMatchPattern.push(row + increaseBy);
            }
            increaseBy += this.totalRow;
            matchingPattern.push(horizontalMatchPattern)
        }
        return matchingPattern;
    }

    // get vertical winning pattern which can be used to check the winner
    getVerticalPattern() {
        let matchingPattern = [];
        for (let i = 0; i < this.totalRow; i++) {
            let increaseBy = 0;
            let verticalMatchPattern = [];
            for (let row = 0; row < this.totalRow; row++) {
                verticalMatchPattern.push(i + increaseBy);
                increaseBy += this.totalRow;
            }
            matchingPattern.push(verticalMatchPattern)
        }
        return matchingPattern;
    }

    // get left diagonal winning pattern which can be used to check the winner
    getLeftDiagonalPattern() {
        let increaseBy = 0;
        let diagonalMatchPattern = [];
        for (let i = 0; i < this.totalRow; i++) {
            diagonalMatchPattern.push(i + increaseBy);
            increaseBy += this.totalRow;
        }
        return diagonalMatchPattern;
    }

    // get right diagonal winning pattern which can be used to check the winner
    getRightDiagonalPattern() {
        let initial = this.totalRow - 1;
        let increaseBy = 0;
        let diagonalMatchPattern = [];
        for (let i = 0; i < this.totalRow; i++) {
            diagonalMatchPattern.push(initial + increaseBy);
            increaseBy += this.totalRow;
            initial -= 1;
        }
        return diagonalMatchPattern;
    }

    // get combined winning pattern and assign it to a array
    getWinningPattern() {
        winningPattern = this.getHorizontalPattern().concat(this.getVerticalPattern());
        winningPattern.push(this.getLeftDiagonalPattern());
        winningPattern.push(this.getRightDiagonalPattern());
        console.log(winningPattern)
    }
}
