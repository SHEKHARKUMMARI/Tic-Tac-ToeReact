import { Component } from "react";
import Board from "./Board";
import calculateWinner from "./winner";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      currentStep: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(i) {
    const history = this.state.history;
    const step = this.state.currentStep;
    const current = history[step];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";

    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: step % 2 === 0,
      currentStep: history.length
    });
  }
  jump(step) {
    const history = this.state.history.slice(0, step + 1);
    this.setState({
      history: history.slice(0, step),
      xIsNext: step % 2 === 0,
      currentStep: step
    });
  }
  makeList(history) {
    const arr = history.map((step, move) => {
      let desc;
      if (move) {
        desc = "Goto move : " + move;
      } else desc = "start the game";

      return (
        <li>
          <button onClick={(move) => this.jump(move)}>{desc}</button>
        </li>
      );
    });
    return arr;
  }
  render() {
    const history = this.state.history;
    const step = this.state.currentStep;
    console.log(step);
    const current = history[step];
    console.log(current);
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "<h1> winner : " + winner + "</h1>";
    } else {
      status = "Now : <b>" + (this.state.xIsNext ? "X" : "O") + "</b>";
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div dangerouslySetInnerHTML={{ __html: status }} />
          <ou>{this.makeList(history)}</ou>
        </div>
      </div>
    );
  }
}
export default Game;
