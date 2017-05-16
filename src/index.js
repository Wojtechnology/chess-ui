import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_ROWS = 8;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      {props.column}
      {props.row}
    </button>
  );
}

function squareNumber(row, column) {
  return BOARD_ROWS * row + column;
}

function rowNum(row) {
  if (row > BOARD_ROWS || row <= 0) {
    throw "Error: Row Number is Out of Bounds!";
  } 
  return BOARD_ROWS - row;
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

  renderSquare(i,r, c) {
    return (
      <Square 
        value={this.state.squares[i]}
        row={r}
        column = {c}
        onClick={() => this.handleClick(i)}
      /> 
    );    
  }

  renderRow(rowNumber) {
    const rank = rowNumber + 1;
    const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return (
      <div className="board-row">
        {this.renderSquare(squareNumber(rowNumber, 0), rank, cols[0])}
        {this.renderSquare(squareNumber(rowNumber, 1), rank, cols[1])}
        {this.renderSquare(squareNumber(rowNumber, 2), rank, cols[2])}
        {this.renderSquare(squareNumber(rowNumber, 3), rank, cols[3])}
        {this.renderSquare(squareNumber(rowNumber, 4), rank, cols[4])}
        {this.renderSquare(squareNumber(rowNumber, 5), rank, cols[5])}
        {this.renderSquare(squareNumber(rowNumber, 6), rank, cols[6])}
        {this.renderSquare(squareNumber(rowNumber, 7), rank, cols[7])}
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
          {this.renderRow(rowNum(4))}
          {this.renderRow(rowNum(5))}
          {this.renderRow(rowNum(6))}
          {this.renderRow(rowNum(7))}
          {this.renderRow(rowNum(8))}
      </div>
    );
  }
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
