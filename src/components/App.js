import {Provider} from 'mobx-react';
import React from 'react';
import MainStore from '../stores/MainStore';
import TicTacToe from './TicTacToe/TicTacToe';
import GameSetup from './GameSetup/GameSetup';

export default class App extends React.Component {
    mainStore = new MainStore();

    constructor(props) {
        super(props);
        this.mainStore.setupNewGame.bind(this.mainStore)()
    }

    render() {
        const mainStore = this.mainStore;

        return (
            <Provider mainStore={mainStore}>
                <GameSetup />
                <TicTacToe />
            </Provider>
        )
    }
}