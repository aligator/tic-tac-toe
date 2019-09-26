import {observable, action, decorate} from 'mobx';

import {TicTacToe} from '../model/TicTacToe';
import { NewGame } from '../model/NewGame';

export default class MainStore {
    newGame = null;
    ticTacToe = null;

    setupNewGame() {
        this.newGame = new NewGame();
    }

    getNewTicTacToeGame() {
        this.ticTacToe = new TicTacToe(this.newGame.name);
    }
}

decorate(MainStore, {
    newGame: observable,
    ticTacToe: observable,
    getNewTicTacToeGame: action
});