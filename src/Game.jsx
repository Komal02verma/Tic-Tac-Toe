import React, { useRef, useState } from "react";
import circle_icon from "./assets/circle.png";
import cross_icon from "./assets/cross.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const initialData = ["", "", "", "", "", "", "", "", ""];
const Game = () => {
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const titleRef = useRef(null);

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }

        const newData = [...data];
        if (count % 2 === 0) {
            newData[num] = "x";
        } else {
            newData[num] = "o";
        }

        setData(newData);
        setCount(count + 1);
        checkWin(newData);
    };

    const checkWin = (newData) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c]) {
                won(newData[a]);
                return;
            }
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations <img src=${winner === "x" ? cross_icon : circle_icon} alt=${winner} style="height: 1em; vertical-align: middle;" />`;
    };

    const resetGame = () => {
        setData(initialData);
        setCount(0);
        setLock(false);
        titleRef.current.innerHTML = "Tic Tac Toe";
    };

    return (
        <div className="container-fluid text-center text-light vh-100 d-flex flex-column align-items-center justify-content-center">
            <h1 className="text-warning fw-bolder p-5" ref={titleRef}>
                Tic Tac Toe
            </h1>
            <div className="d-flex flex-wrap bg-warning justify-content-center" style={{ width: "15rem" }}>
                {data.map((value, index) => (
                    <div
                        key={index}
                        className="d-flex align-items-center justify-content-center border border-warning"
                        onClick={(e) => toggle(e, index)}
                        style={{ width: "5rem", height: "5rem", cursor: "pointer" }}
                    >
                        {value && <img src={value === "x" ? cross_icon : circle_icon} alt={value} className="img-fluid p-4" />}
                    </div>
                ))}
            </div>
            <button className="btn m-5 px-5 fs-5 text-dark bg-warning rounded-pill fw-bold" onClick={resetGame}>
                Reset
            </button>
        </div>
    );
};

export default Game;
