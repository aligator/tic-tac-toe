import {observable, action, decorate} from 'mobx';

import {TicTacToe} from '../model/TicTacToe';

export default class MainStore {
    ticTacToe = null;

    getNewTicTacToeGame() {
        this.ticTacToe = new TicTacToe()
    }
}

decorate(MainStore, {
    ticTacToe: observable,
    getNewTicTacToeGame: action
});