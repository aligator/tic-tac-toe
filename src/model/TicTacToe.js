import {observable, action, extendObservable, decorate} from 'mobx';

export const PLAYERS = ['X', 'O']

export class TicTacToe {
    currentPlayer = PLAYERS[0];
    winner = null;
    gameBoard = new Array(9).fill(null)

    constructor(store, initialState) {
        this.store = store;

        // TODO: do I need this?
        extendObservable(this, initialState)
    }

    doMove(position) {
        if (this.winner !== null)
            return;

        const currentValue = this.gameBoard[position];

        if (currentValue === null) {
            this.gameBoard[position] = this.currentPlayer;
            this.winner = calculateWinner(this);

            if (this.winner === null) {
                switchCurrentPlayer(this);
            }
        }
    }
}

// private helpler functions
function switchCurrentPlayer(ticTacToe) {
    ticTacToe.currentPlayer = ticTacToe.currentPlayer === PLAYERS[0] ? PLAYERS[1] : PLAYERS[0];
}

function calculateWinner(ticTacToe) {
    // save all possible checks in const, as it's cleaner than some cracy for lopps
    // and the possible checks won't change
    const checks = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i=0; i<checks.length; i++) {
        let check = checks[i];

        if (ticTacToe.gameBoard[check[0]] === ticTacToe.gameBoard[check[1]]
            && ticTacToe.gameBoard[check[0]] === ticTacToe.gameBoard[check[2]]) {
            return ticTacToe.gameBoard[check[0]];
        }
    }
    return null;
}

decorate(TicTacToe, {
    currentPlayer: observable,
    winner: observable,
    gameBoard: observable,
    doMove: action,
});