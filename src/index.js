import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_ROWS = 3;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      /> 
    );    
  }

  renderRow(row) {
    return (
      <div className="board-row">
        {this.renderSquare(BOARD_ROWS * row + 0)}
        {this.renderSquare(BOARD_ROWS * row + 1)}
        {this.renderSquare(BOARD_ROWS * row + 2)}
      </div>
    );

  }

   render() {
     return (
       <div>
         <div className="status">{status}</div>
          {this.renderRow(rowNum(1))}
          {this.renderRow(rowNum(2))}
          {this.renderRow(rowNum(3))}
      </div>
    );
  }
}

function rowNum(row) {
  if (row > BOARD_ROWS || row <= 0) {
    throw 'Error: Row Number is Out of Bounds!';
  } 
  return BOARD_ROWS - row;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
