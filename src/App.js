import React, { useEffect, useState } from "react";
import "./App.css";
import generateArray from "./algorithm/generateArray";
import mergeSort from "./algorithm/mergeSort";
import swap from "./algorithm/swapArray";

function App() {
  const ANDREA = 0;
  const CARLOS = 1;
  const MARCELO = 2;

  const [array, setArray] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    reset();
  }, []);

  function solveProblem() {
    setIsOver(true);

    const { trades } = mergeSort({ arr: array, count: 0, trades: [] });
    let count = 0;
    let temp = [...array];

    const interval = setInterval(() => {
      if (count >= trades.length) {
        setIsOver(false);
        clearInterval(interval);
      } else {
        setSelectedUser(count % 3);
        temp = swap(temp, trades[count][0], trades[count][1]);
        setArray(temp);
        count++;
      }
    }, 1000);
  }

  function reset() {
    setSelectedUser(null);
    setArray(generateArray());
  }

  const selectStyle = {
    textDecoration: "underline",
    color: "#023055",
    fontWeight: "bold",
  };

  return (
    <div className="bg-light" style={{ height: "100vh" }}>
      <div className="container">
        <div className="text-center pt-4" style={{ color: "#353535" }}>
          <h1 className="mb-4">
            Projeto:{" "}
            <span className="bold-text" style={{ color: "#004278" }}>
              Quem ganha primeiro?
            </span>{" "}
          </h1>
          <p>
            Andrea, Carlos e Marcelo são muito amigos e passam todos os finais
            de semana juntos. Um dia, Andrea, usando o computador portátil,
            decidiu propror uma brincadeira o qual ela gerava um inteiro
            aleatório N e uma seqüência de inteiros, também aleatória, que é uma
            permutação de 1, 2, . . . ,N. <br /> O jogo então começa, cada
            jogador faz um movimento, e a jogada passa para o outro jogador.
            Marcelo é sempre o primeiro a começar a jogar. Um movimento de um
            jogador consiste na escolha de um par de elementos consecutivos da
            seqüência que estejam fora de ordem e em inverter a ordem dos dois
            elementos. Por exemplo, dada a seqüência 1, 5, 3, 4, 2, o jogador
            pode inverter as posições de 5 e 3 ou de 4 e 2, mas não pode
            inverter as posições de 3 e 4, nem de 5 e 2. Continuando com o
            exemplo, se o jogador decide inverter as posições de 5 e 3 então a
            nova seqüência será 1, 3, 5, 4, 2. Mais cedo ou mais tarde, a
            seqüência ficará ordenada. Perde o jogador impossibilitado de fazer
            um movimento. <br />
            <b>
              Sua missão, caso decida aceitá-la, é determinar quem ganha o jogo,
              dada a seqüência inicial.
            </b>
          </p>
        </div>
        <div className="row my-5">
          <div className="col">
            <ul className="d-flex justify-content-center number-list">
              {array.map((number) => (
                <li style={{ width: 25 + number * Math.log(number) * 1.5, height: 25 + number * Math.log(number) * 1.5 }}>{number}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row ">
          <div className="col">
            <ul className="list-users d-flex justify-content-around mb-5 pb-5">
              <li style={selectedUser === ANDREA ? selectStyle : null}>
                Andrea
              </li>
              <li style={selectedUser === CARLOS ? selectStyle : null}>
                Carlos
              </li>
              <li style={selectedUser === MARCELO ? selectStyle : null}>
                Marcelo
              </li>
            </ul>

            <div className="d-flex justify-content-center">
              <button
                onClick={solveProblem}
                className="btn mr-5"
                disabled={isOver}
              >
                Resolver
              </button>
              <button onClick={reset} className="btn" disabled={isOver}>
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
