import React from 'react'

const players = ['X', 'O']

class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            history: [new Array(9).fill(null)],
            active: 0, // index of the active history
            currentPlayer: players[0],
            winner: null,
        }
    }

    checkWinning(cells) {
        // save all possible checks in const, as it's cleaner than some cracy for lopps
        // and the possible checks won't change
        const checks = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let check of checks) {
            if (cells[check[0]] === cells[check[1]]
                && cells[check[0]] === cells[check[2]]) {
                return cells[check[0]];
            }
        }
        return null;
    }

    handleCellClick(i) {
        if (this.state.winner !== null)
            return;

        // no action allowed if old history is active
        if (this.state.active !== this.state.history.length-1)
            return;

        const currentValue = this.state.history[this.state.active][i]

        if (currentValue === null) {
            let newState = {
                history: this.state.history.concat([this.state.history[this.state.active].slice()]),
                active: this.state.active + 1,
                currentPlayer: this.state.currentPlayer,
            }

            newState.history[newState.active][i] = this.state.currentPlayer
            newState.currentPlayer = newState.currentPlayer === players[0] ? players[1]
                                                                    : players[0];

            newState.winner = this.checkWinning(newState.history[newState.active]);
            this.setState(newState);
        }
    }

    handleHistoryClick(i) {
        let newState = {
            active: i,
        }
        
        this.setState(newState);
    }

    render() {
        let status;

        if (this.state.history.length - 1 === this.state.active) {
            status = this.state.winner !== null ? "Winner is " + this.state.winner
                                                    : "Turn of player " + this.state.currentPlayer;
        } else {
            status = "Timetravel to #" + this.state.active;
        }

        return (
            <div className="tic-tac-toe">
                <div className="status">{status}</div>
                <Board 
                    cells={this.state.history[this.state.active]}
                    onClick={(i) => this.handleCellClick(i)}/>
                <History 
                    historyNum={this.state.history.length} 
                    onClick={(i) => this.handleHistoryClick(i)}/>
            </div>
        );
    }
}

function Board(props) {
    function renderCell(i) {
        return (
            <Cell
                value={props.cells[i]}
                onClick={() => props.onClick(i)}/>
        );
    }

    return (
        <div className="board">
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
}

function Cell(props) {
    return (
        <button 
            className="cell" 
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function History(props) {
    let history = [];
    for (let i = 0; i < props.historyNum; i++) {
        history.push(
            <button key={i}
                className="history" 
                onClick={() => props.onClick(i)}>
                History #{i}
            </button>
        ) 
    }

    return (history);
}

export default TicTacToe;