let selectGameType = document.querySelector('.selectGameType');

var winner = document.querySelector('.winner');
var winnerName = winner.querySelector('.winnerName');
var draw = document.querySelector('.draw');
var retryBtn = document.querySelector('.retryBtn');

getSelectedGame(selectGameType.value);

selectGameType.addEventListener('change', function () {
    getSelectedGame(this.value)
});

var totalRow;
var maxMove;
var minWinnerCheckMove;

// get game according to the selected game type
function getSelectedGame(gameType) {
    totalRow = gameType;
    maxMove = totalRow * totalRow;

    if (gameType == 3) {
        minWinnerCheckMove = 4;
    } else if (gameType == 6) {
        minWinnerCheckMove = 10;
    }

    new Game(parseInt(totalRow), maxMove, minWinnerCheckMove).start();
}

function getGameInstance() {
    return new Game(parseInt(totalRow), maxMove, minWinnerCheckMove);
}