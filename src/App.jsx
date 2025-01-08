/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    // const [value, setValue] = useState("");

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const newSquares = squares.slice();
        xIsNext ? (newSquares[i] = "🦍") : (newSquares[i] = "🦧");
        // newSquares[i] = xIsNext ? "X" : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    function handleNewGame() {
        // Reset the game to its initial state
        setSquares(Array(9).fill(null));
        setXIsNext(true);
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
                <button className="new-game" onClick={handleNewGame}>
                    New game
                </button>
            </div>
        </>
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
