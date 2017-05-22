import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';

import BlackPawn from './images/Pawn-B.png'
import BlackRook from './images/Rook-B.png'
import BlackKnight from './images/Knight-B.png'
import BlackBishop from './images/Bishop-B.png'
import BlackQueen from './images/Queen-B.png'
import BlackKing from './images/King-B.png'

const BOARD_SIZE = 8;

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      <img src={props.image} alt={"Black Bishop"}/> 
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
      game: null,
      squares: [],
      selectedIndex: null,
      images: [BlackPawn],
    };
  }

  componentDidMount() {
    this.getPieces();
  }

  getPieces() {
    var board = this;
    axios.get('http://localhost:8080/game')
      .then(function (response) {
        board.saveGame(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  movePiece(fromSquare, toSquare) {
    var board = this;
    axios.get('http://localhost:8080/move?from=' + fromSquare + '&to=' + toSquare)
      .then(function(response){
        board.saveGame(response.data);
        console.log('saved successfully')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  saveGame(g) {
    this.setState({
      game: g,
      squares: g.squares.split(','),
    })
  }

  handleClick(clickedIndex) {
    const squares = this.state.squares.slice();
    const selectedIndex = this.state.selectedIndex;

    if (selectedIndex !== null) {
      this.movePiece(selectedIndex, clickedIndex);
      this.setState({selectedIndex: null});
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
        // image={BlackPawn}
        // image={this.state.inages[this.state.squares[squareNumber]]}
        image={this.state.images[0]}
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
