import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_ROWS = 8;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
      {props.row}
      {props.column}
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

  renderRow(row) {
    const rank = row + 1;
    return (
      <div className="board-row">
        {this.renderSquare(squareNumber(row, 0), rank, 'a')}
        {this.renderSquare(squareNumber(row, 1), rank, 'b')}
        {this.renderSquare(squareNumber(row, 2), rank, 'c')}
        {this.renderSquare(squareNumber(row, 3), rank, 'd')}
        {this.renderSquare(squareNumber(row, 4), rank, 'e')}
        {this.renderSquare(squareNumber(row, 5), rank, 'f')}
        {this.renderSquare(squareNumber(row, 6), rank, 'g')}
        {this.renderSquare(squareNumber(row, 7), rank, 'h')}
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
