import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_SIZE = 8;
const PIECES = ['wR','wN','wB','wQ','wK','wB','wN','wR','wP','wP','wP','wP','wP','wP','wP','wP','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','bP','bP','bP','bP','bP','bP','bP','bP','bR','bN','bB','bQ','bK','bB','bN','bR'];

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function squareNumber(row, col) {
  return (BOARD_SIZE * row) + columnNumber(col);
}

function columnNumber(col) {
  return col.charCodeAt(0) - 97;
}

function rowNum(row) {
  if (row > BOARD_SIZE || row <= 0) {
    throw new Error("Row Number is Out of Bounds!");
  } 
  return BOARD_SIZE - row;
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: PIECES,
      selectedIndex: null,
    };
  }

  handleClick(clickedIndex) {
    const squares = this.state.squares.slice();
    const selectedIndex = this.state.selectedIndex;

    if (selectedIndex !== null) {

      // handle second click
      if (clickedIndex === selectedIndex) {
        this.setState({selectedIndex: null});
        return;
      }

      // move piece
      squares[clickedIndex] = squares[selectedIndex];
      squares[selectedIndex] = "";

      this.setState({
        selectedIndex: null,
        squares: squares,
      });
        
      return;
    }

    if (squares[clickedIndex] === "") {
      this.setState({selectedIndex: null});
      return;
    }

    this.setState({selectedIndex: clickedIndex});
  }

  renderSquare(squareNumber) {
    return (
      <Square 
        value={this.state.squares[squareNumber]}
        squareNumber={squareNumber}
        onClick={() => this.handleClick(squareNumber)}
      /> 
    );    
  }

  renderRow(row) {
    return (
      <div className="board-row">
        {this.renderSquare(squareNumber(row, 'a'))}
        {this.renderSquare(squareNumber(row, 'b'))}
        {this.renderSquare(squareNumber(row, 'c'))}
        {this.renderSquare(squareNumber(row, 'd'))}
        {this.renderSquare(squareNumber(row, 'e'))}
        {this.renderSquare(squareNumber(row, 'f'))}
        {this.renderSquare(squareNumber(row, 'g'))}
        {this.renderSquare(squareNumber(row, 'h'))}
      </div>
    )
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
