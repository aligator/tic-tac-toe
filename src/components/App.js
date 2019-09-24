import {Provider} from 'mobx-react';
import React from 'react';
import MainStore from '../stores/MainStore';
import TicTacToeBoard from './TicTacToeBoard'

export default class App extends React.Component {
    mainStore = new MainStore();

    constructor(props) {
        super(props);
        this.mainStore.getNewTicTacToeGame.bind(this.mainStore)()
    }

    render() {
        const mainStore = this.mainStore;

        return (
            <Provider mainStore={mainStore}>
                <TicTacToeBoard />
            </Provider>
        )
    }
}