import React from 'react';
import { inject, observer } from 'mobx-react';
import './TicTacToe.css';

const Cell = inject('mainStore')(observer(({mainStore, number}) => {
    return (
        <button className="cell" onClick={() => {
            mainStore.ticTacToe.doMove(number)
        } }>
            {mainStore.ticTacToe.getCell(number)}
        </button>
    );
}))

const GameMessage = inject('mainStore')(observer(({mainStore}) => {
    if (mainStore.ticTacToe.winner !== null) {
        return <div className="message">Winner is {mainStore.ticTacToe.winner}</div>
    } else {
        return <div className="message">Current player is {mainStore.ticTacToe.currentPlayer}</div>
    }
}))

const History = inject('mainStore')(observer(({mainStore}) => {
    let historyButtons = [];

    for (let i=0; i < mainStore.ticTacToe.history.length; i++)
    {
        let buttonText;
        if (i === mainStore.ticTacToe.history.length-1) {
            buttonText = "Continue game";
        } else {
            buttonText = `Jump to step ${i}`;
        }
        historyButtons.push(
            <li key={i}>
                <button onClick={() => mainStore.ticTacToe.shiftTime(i)}>
                    {buttonText}
                </button>
            </li>)
    }

    return (
        <ol>{historyButtons}</ol>
    );
}))

function Board() {
    function renderCell(number) {
        return (
            <Cell number={number}/>
        );
    }

    return (
        <div className="game-board">
            <div>
                <div className="board-row">
                    <div className="board-row">
                        {renderCell(0)}
                        {renderCell(1)}
                        {renderCell(2)}
                    </div>
                    <div className="board-row">
                        {renderCell(3)}
                        {renderCell(4)}
                        {renderCell(5)}
                    </div>
                    <div className="board-row">
                        {renderCell(6)}
                        {renderCell(7)}
                        {renderCell(8)}
                    </div>
                </div>
            </div>
        </div>
    );
}

const TicTacToe = inject('mainStore')(observer(({mainStore}) => {
    if (mainStore.ticTacToe === null)
        return;
    
    return (
        <div className="game">
            <GameMessage />
            <div className="game-body">
                <Board />
                <div className="game-info">
                    
                </div>
            </div>
        </div>
    );
}));

export default TicTacToe;