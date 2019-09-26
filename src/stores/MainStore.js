import {observable, action, decorate} from 'mobx';

import {TicTacToe} from '../model/TicTacToe';
import { GameSetup } from '../model/GameSetup';

export default class MainStore {
    gameSetup = null;
    ticTacToe = null;

    setupNewGame() {
        this.gameSetup = new GameSetup();
    }

    getNewTicTacToeGame() {
        this.ticTacToe = new TicTacToe(this.gameSetup.name);
    }
}

decorate(MainStore, {
    gameSetup: observable,
    ticTacToe: observable,
    getNewTicTacToeGame: action
});