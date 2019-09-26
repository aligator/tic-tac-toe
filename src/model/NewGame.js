import {observable, decorate, action} from 'mobx';

export class NewGame {
    name = "";

    changeName(value) {
        this.name = value;
    }
}

decorate(NewGame, {
    name: observable,
    changeName: action
});