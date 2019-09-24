import {observable, action, decorate} from 'mobx';

export const PLAYERS = ['X', 'O']

export class TicTacToe {
    currentPlayer = PLAYERS[0];
    winner = null;
    history = [new Array(9).fill(null)];
    timeshiftStep = null;

    getCell(number) {
        let pos;

        if (this.timeshiftStep !== null) {
            pos = this.timeshiftStep;
        } else {
            pos = this.history.length-1;
        }

        return this.history[pos][number];
    }

    doMove(position) {
        // prevent manipulating if in timeshift mode
        if (this.timeshiftStep !== null)
            return;

        if (this.winner !== null)
            return;

        const currentValue = this.getCell(position);

        if (currentValue === null) {
            setCell(this, position, this.currentPlayer)
            
            this.winner = calculateWinner(this);

            if (this.winner === null) {
                switchCurrentPlayer(this);
            }
        }
    }

    shiftTime(step) {
        if (step < this.history.length) {
            if (step === this.history.length-1)
                this.timeshiftStep = null;
            else
                this.timeshiftStep = step;
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

        if (ticTacToe.getCell(check[0]) === ticTacToe.getCell(check[1])
            && ticTacToe.getCell(check[0]) === ticTacToe.getCell(check[2])) {
            return ticTacToe.getCell(check[0]);
        }
    }
    return null;
}

function setCell(ticTacToe, number, playerValue) {
    let newBoard = ticTacToe.history[ticTacToe.history.length-1].slice()
    newBoard[number] = playerValue;
    ticTacToe.history.push(observable(newBoard))
}

decorate(TicTacToe, {
    currentPlayer: observable,
    winner: observable,
    history: observable,
    timeshiftStep: observable,
    doMove: action,
    shiftTime: action,
});