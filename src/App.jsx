import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Dice from "./components/Dice";
import Confetti from "./components/Confetti";

function App() {
  const [allDice, setAllDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = allDice.every((dice) => dice.isHeld === true);
    const firstValue = allDice[0].value;
    const allSameValue = allDice.every((dice) => dice.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [allDice]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  const rollDice = () => {
    if (!tenzies) {
      setAllDice((oldDice) =>
        oldDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    } else {
      setAllDice(allNewDice());
      setTenzies(false);
    }
  };
  const holdDice = (id) => {
    setAllDice((oldDice) =>
      oldDice.map((item) => {
        return item.id === id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  };

  const diceElements = allDice.map((dice) => (
    <Dice
      number={dice.value}
      key={dice.id}
      holdDice={() => holdDice(dice.id)}
      isHeld={dice.isHeld}
    />
  ));
  return (
    <section className="main-wrapper">
      <main>
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-wrapper">{diceElements}</div>

        <button onClick={rollDice} className="roll-dice-btn">
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </section>
  );
}

export default App;
