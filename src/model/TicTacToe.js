import {observable, action, decorate} from 'mobx';
import Axios from 'axios';

export const PLAYERS = ['X', 'O']

export class TicTacToe {
    currentPlayer = PLAYERS[0];
    winner = null;
    history = [new Array(9).fill(null)];
    timeshiftStep = null;

    getCell(position) {
        let historyNum;

        if (this.timeshiftStep !== null) {
            historyNum = this.timeshiftStep;
        } else {
            historyNum = this.history.length-1;
        }

        return this.history[historyNum][position];
    }

    doMove(position) {
        let that = this;

        Axios.put("http://localhost:5000/game/board/" + Number(position))
            .then(function (response) {
                console.log(response)
                // TODO: maybe check response?
                updateBoard(that)
                updateWinner(that)
                updateCurrentPlayer(that)
            })
            .catch(function (error) {
                console.log(error);
            });
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

// Private helper functions
async function updateBoard(that) {
    await Axios.get("http://localhost:5000/game/board")
        .then(function (response) {
            that.history[0] = response.data.board;
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function updateWinner(that) {
    await Axios.get("http://localhost:5000/game/winner")
        .then(function (response) {
            console.log(response.data.winner)
            // treat " " as null
            if (response.data.winner !== " ")
                that.winner = response.data.winner;
        })
        .catch(function (error) {
            console.log(error);
        });
}

async function updateCurrentPlayer(that) {
    await Axios.get("http://localhost:5000/game/current_player")
        .then(function (response) {
            that.currentPlayer = response.data.currentPlayer;
        })
        .catch(function (error) {
            console.log(error);
        });
}

decorate(TicTacToe, {
    currentPlayer: observable,
    winner: observable,
    history: observable,
    timeshiftStep: observable,
    doMove: action,
    shiftTime: action,
});