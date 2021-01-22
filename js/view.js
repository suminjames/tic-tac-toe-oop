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