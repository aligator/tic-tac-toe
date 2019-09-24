import {observable, action, decorate} from 'mobx';

import {TicTacToe, PLAYERS} from '../model/TicTacToe';

export default class MainStore {
    ticTacToe = null;

    getNewTicTacToeGame() {
        this.ticTacToe = new TicTacToe({
            currentPlayer: PLAYERS[0],
            winner: null,
            gameBoard: new Array(9).fill(null)
        })
    }
}

decorate(MainStore, {
    ticTacToe: observable,
    getNewTicTacToeGame: action
});