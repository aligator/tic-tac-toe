import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from 'react';

const GameSetup = inject('mainStore')(observer(({mainStore}) => {  
    return (
        <div className="setup">
            <label htmlFor="name" />
            <input id="name" value={mainStore.newGame.name} onChange={(event) => {
                console.log(event)
                mainStore.newGame.changeName(event.target.value)}
            } />
            <button onClick={() => {mainStore.getNewTicTacToeGame.bind(mainStore)()}}>Start</button>
        </div>
    );
}));

export default GameSetup;