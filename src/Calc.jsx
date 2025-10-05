import { useState, useEffect } from "react";
import "./styles.css";

export default function Calc() {
  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperator] = useState(null);

  const handleClick = (e) => {
    handleInput(e.currentTarget.value);
  };

  const handleInput = (input) => {
    switch (input) {
      // Numbers
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        setCurrentValue((prev) => (prev === "0" ? input : prev + input));
        break;

      // Operators
      case "+":
      case "-":
      case "*":
      case "%":
      case "/":
        if (operation && currentValue === "") return;
        setPreviousValue(currentValue);
        setCurrentValue("");
        setOperator(input);
        break;

      // Decimal
      case ".":
        if (!currentValue.includes(".")) {
          setCurrentValue(currentValue + ".");
        }
        break;

      // Equals
      case "=":
      case "Enter":
        if (previousValue === null || currentValue === "" || !operation) return;
        const prev = parseFloat(previousValue);
        const curr = parseFloat(currentValue);
        let computation = 0;

        switch (operation) {
          case "+":
            computation = prev + curr;
            break;
          case "-":
            computation = prev - curr;
            break;
          case "*":
            computation = prev * curr;
            break;
          case "/":
            if (curr === 0) {
              alert("Cannot divide by zero");
              return;
            }
            computation = prev / curr;
            break;
          case "%":
            computation = (prev / 100) * curr;
            break;
          default:
            computation = curr;
        }

        setCurrentValue(computation.toString());
        setPreviousValue(null);
        setOperator(null);
        break;

      // Reset All
      case "resetAll":
      case "Escape":
        setCurrentValue("0");
        setPreviousValue(null);
        setOperator(null);
        break;

      // Backspace / CE
      case "clearEntry":
      case "Backspace":
        if (currentValue === "" && operation) {
          setOperator(null);
          setCurrentValue(previousValue || "0");
          setPreviousValue(null);
        } else {
          setCurrentValue((prev) =>
            prev.length > 1 ? prev.slice(0, -1) : "0"
          );
        }
        break;

      default:
        break;
    }
  };

  // Keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key;
      const validKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
        "%",
        ".",
        "=",
        "Enter",
        "Backspace",
        "Escape",
      ];
      if (validKeys.includes(key)) {
        e.preventDefault();
        handleInput(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className="container fade-in">
      {/* Header */}
      <h1 className="fade-up">Calcoolator</h1>

      {/* Calculator */}
      <div className="App fade-up">
        <p id="resultScreen">
          {previousValue}
          {operation}
          {currentValue}
        </p>

        <div className="calcBtns" id="firstRow">
          <button value="resetAll" onClick={handleClick}>
            RE
          </button>
          <button value="clearEntry" onClick={handleClick}>
            CE
          </button>
          <button value="%" onClick={handleClick}>
            %
          </button>
          <button value="/" onClick={handleClick}>
            ÷
          </button>
        </div>

        <div className="calcBtns">
          <button value="7" onClick={handleClick}>7</button>
          <button value="8" onClick={handleClick}>8</button>
          <button value="9" onClick={handleClick}>9</button>
          <button value="*" onClick={handleClick}>×</button>
        </div>

        <div className="calcBtns">
          <button value="4" onClick={handleClick}>4</button>
          <button value="5" onClick={handleClick}>5</button>
          <button value="6" onClick={handleClick}>6</button>
          <button value="-" onClick={handleClick}>−</button>
        </div>

        <div className="calcBtns">
          <button value="1" onClick={handleClick}>1</button>
          <button value="2" onClick={handleClick}>2</button>
          <button value="3" onClick={handleClick}>3</button>
          <button value="+" onClick={handleClick}>+</button>
        </div>

        <div className="calcBtns">
          <button id="bigZero" value="0" onClick={handleClick}>0</button>
          <button value="." onClick={handleClick}>.</button>
          <button value="=" onClick={handleClick}>=</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="fade-up">
        Code by{" "}
        <a
          href="https://malika.engineer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Malika Shakila
        </a>
      </footer>
    </div>
  );
}
