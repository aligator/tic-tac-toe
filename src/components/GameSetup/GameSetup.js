import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import React from 'react';

const GameSetup = inject('mainStore')(observer(({mainStore}) => {  
    if (mainStore.ticTacToe !== null)
        return;

    return (
        <div className="setup">
            <label htmlFor="name" />
            <input id="name" 
                value={mainStore.gameSetup.name} 
                onChange={(event) => mainStore.gameSetup.changeName(event.target.value)} />
            <button 
                onClick={() => {mainStore.getNewTicTacToeGame.bind(mainStore)()}}>
                    Start
            </button>
        </div>
    );
}));

export default GameSetup;