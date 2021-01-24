var boxCollection;
var moveMadeCount;

class Box {
    constructor(rowCount) {
        this.rowCount = rowCount;
        this.boardRow = document.querySelector('#rowCount-' + this.rowCount);
        this.boxObject;
        this.checked = false;
    }

    render() {
        let box = document.querySelector('.box');
        this.boxObject = box.cloneNode(true);
        this.boxObject.classList.remove('d-none');

        boxCollection.push(this);

        this.boardRow.appendChild(this.boxObject);
    }

    handleClick(player) {
        this.checked = true;
        this.boxObject.innerHTML = player.move;
        moveMadeCount += 1;

        if (player.isWinner()) {
            let view = new View();
            view.render();
            return false;
        }

        player.changeTurn();
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
        this.board = document.querySelector('.board');
    }

    render() {
        for (let row = 0; row < this.totalRow; row++) {
            let boxRow = new BoxRow(this.board, row);
            boxRow.render();
            for (let j = 0; j < this.totalRow; j++) {
                let box = new Box(row);
                box.render();
            }
        }
    }

    clear() {
        this.board.querySelectorAll('.boardRow.d-flex').forEach(function (boxRow) {
            boxRow.innerHTML = ""
        });
        boxCollection = [];
        moveMadeCount = 0;

        if (!winner.classList.contains('d-none')) {
            winner.classList.add('d-none');
        }

        if (!draw.classList.contains('d-none')) {
            draw.classList.add('d-none');
        }

        if (!retryBtn.classList.contains('d-none')) {
            retryBtn.classList.add('d-none');
        }
    }

}