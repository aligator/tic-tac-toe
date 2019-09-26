import {observable, decorate, action} from 'mobx';

export class GameSetup {
    name = "";

    changeName(value) {
        this.name = value;
    }
}

decorate(GameSetup, {
    name: observable,
    changeName: action
});