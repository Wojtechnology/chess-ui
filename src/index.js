import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';

import WhitePawn from './images/Pawn-W.png'
import WhiteRook from './images/Rook-W.png'
import WhiteKnight from './images/Knight-W.png'
import WhiteBishop from './images/Bishop-W.png'
import WhiteQueen from './images/Queen-W.png'
import WhiteKing from './images/King-W.png'
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
      images: [
                ['wP', WhitePawn],
                ['wR', WhiteRook],
                ['wN', WhiteKnight],
                ['wB', WhiteBishop],
                ['wQ', WhiteQueen],
                ['wK', WhiteKing],
                ['bP', BlackPawn],
                ['bR', BlackRook],
                ['bN', BlackKnight],
                ['bB', BlackBishop],
                ['bQ', BlackQueen],
                ['bK', BlackKing],
              ],
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

  findImage(piece) {
    var arrayLength = this.state.images.length;
    for (var i = 0; i < arrayLength; i++) {
      if (piece === this.state.images[i][0]) {
        return this.state.images[i][1];
      }
    }    
    return null;
  }

  renderSquare(squareNumber) {
    return (
      <Square 
        value={this.state.squares[squareNumber]}
        image={this.findImage(this.state.squares[squareNumber])}
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
