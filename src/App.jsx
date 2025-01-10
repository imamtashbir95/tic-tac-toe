/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay, onNewGame }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const newSquares = squares.slice();
        xIsNext ? (newSquares[i] = "🦍") : (newSquares[i] = "🦧");
        // newSquares[i] = xIsNext ? "X" : "O";
        onPlay(newSquares);
    }

    const winner = calculateWinner(squares);
    const isDraw = squares.every((square) => square !== null);

    const status = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "Draw!"
            : `Next player: ${xIsNext ? "🦍" : "🦧"}`;

    return (
        <>
            <div className="container">
                <div className="status">{status}</div>
                <div className="board">
                    {squares.map((square, i) => (
                        <Square
                            key={i}
                            value={square}
                            onSquareClick={() => handleClick(i)}
                        />
                    ))}
                </div>
                <button className="new-game" onClick={onNewGame}>
                    New game
                </button>
            </div>
        </>
    );
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }

    function handlePlay(newSquares) {
        const newHistory = [...history.slice(0, currentMove + 1), newSquares];
        setHistory(newHistory);
        setCurrentMove(newHistory.length - 1);
        setXIsNext(!xIsNext);
    }

    function handleNewGame() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setXIsNext(true);
    }

    const moves = history.map((squares, move) => {
        let text = move > 0 ? `Go to move #${move}` : "Go to game start";

        return (
            <li key={move}>
                <button className="move" onClick={() => jumpTo(move)}>{text}</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onNewGame={handleNewGame} />
            </div>
            <div className="game-info">
                <ol className="moves">{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        // const a = lines[i][0];
        // const b = lines[i][1];
        // const c = lines[i][2];
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }

    return false;
}
