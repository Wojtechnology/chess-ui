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
import EmptySquare from './images/EmptySquare.png'

const BOARD_SIZE = 8;

function Square(props) {
  return (
    <button className={props.squareColor} onClick={props.onClick}>
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
                ['bP', BlackPawn],
                ['wB', WhiteBishop],
                ['bB', BlackBishop],
                ['wN', WhiteKnight],
                ['bN', BlackKnight],
                ['wR', WhiteRook],
                ['bR', BlackRook],
                ['wQ', WhiteQueen],
                ['bQ', BlackQueen],
                ['wK', WhiteKing],
                ['bK', BlackKing],
              ],
    };
  }

  componentDidMount() {
    this.getPieces();
  }

  getPieces() {
    var board = this;
    // axios.get('http://localhost:8080/game')
    //   .then(function (response) {
    //     board.saveGame(response.data);
    //   }).catch(function (error) {
    //     console.log(error);
    //   });
    fetch('http://localhost:8080/game').then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok. Error: ' + response.error);
    }).then((game) => {
      board.saveGame(game);
    }).catch(function (error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

  movePiece(fromSquare, toSquare) {
    var board = this;
    axios.get('http://localhost:8080/move?from=' + fromSquare + '&to=' + toSquare)
      .then(function(response){
        board.saveGame(response.data);
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
    return EmptySquare;
  }

  renderSquare(squareNumber, squareColor) {
    return (
      <Square 
        value={this.state.squares[squareNumber]}
        image={this.findImage(this.state.squares[squareNumber])}
        squareNumber={squareNumber}
        squareColor={squareColor}
        onClick={() => this.handleClick(squareNumber)}
      /> 
    );    
  }

  renderRow(row, firstColor) {
    const color1 = firstColor;
    const color2 = firstColor === "whiteSquare" ? "blackSquare" : "whiteSquare";
    return (
      <div className="board-row">
        {this.renderSquare(squareNumber(row, 'a'), color1)}
        {this.renderSquare(squareNumber(row, 'b'), color2)}
        {this.renderSquare(squareNumber(row, 'c'), color1)}
        {this.renderSquare(squareNumber(row, 'd'), color2)}
        {this.renderSquare(squareNumber(row, 'e'), color1)}
        {this.renderSquare(squareNumber(row, 'f'), color2)}
        {this.renderSquare(squareNumber(row, 'g'), color1)}
        {this.renderSquare(squareNumber(row, 'h'), color2)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="status">{status}</div>
          {this.renderRow(rowNum(1), "whiteSquare")}
          {this.renderRow(rowNum(2), "blackSquare")}
          {this.renderRow(rowNum(3), "whiteSquare")}
          {this.renderRow(rowNum(4), "blackSquare")}
          {this.renderRow(rowNum(5), "whiteSquare")}
          {this.renderRow(rowNum(6), "blackSquare")}
          {this.renderRow(rowNum(7), "whiteSquare")}
          {this.renderRow(rowNum(8), "blackSquare")}
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
