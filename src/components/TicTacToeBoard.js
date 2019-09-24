import React from 'react';
import { inject, observer } from 'mobx-react';

const Cell = inject('mainStore')(observer(({mainStore, number}) => {
    return (
        <button className="cell" onClick={() => mainStore.ticTacToe.doMove(number)}>
            {mainStore.ticTacToe.gameBoard[number]}
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

function TicTacToeBoard () {
    function renderCell(number) {
        return (
            <Cell number={number}/>
        );
    }

    return (
        <div className="board">
            <GameMessage />
            <div>
                {renderCell(0)}
                {renderCell(1)}
                {renderCell(2)}
            </div>
            <div>
                {renderCell(3)}
                {renderCell(4)}
                {renderCell(5)}
            </div>
            <div>
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
            </div>
        </div>
    );
};

export default TicTacToeBoard;