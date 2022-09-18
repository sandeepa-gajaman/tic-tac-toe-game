import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {

    /*
    To collect data from multiple children, or to have two child components communicate with each other, 
    you need to declare the shared state in their parent component instead. The parent component can pass 
    the state back down to the children by using props; this keeps the child components in sync with each 
    other and with the parent component.
    **/

    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        /*
        Each time a player moves, xIsNext (a boolean) will be flipped to 
        determine which player goes next and the game’s state will be saved.
        **/
      };
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      //Ignoring a click if someone has won the game or if a Square is already filled
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      //flip the value of xIsNext
      squares[i] = this.state.xIsNext ? 'X' : 'O';

      console.log('If it is ' + this.state.xIsNext + ' squares[i] set to ' + squares[i]);

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
      
      console.log('Flip the value of xIsNext to ' + !this.state.xIsNext);
      console.log(squares);
      
    }
    
    renderSquare(i) {

      /*
      Passing down two props from Board to Square: "value" and "onClick". 
      The onClick prop is a function that Square can call when clicked.
      **/

      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );  
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      let status;
      if (winner) {
        //If a player has won, display text such as “Winner: X” or “Winner: O”.
        status = 'Winner: ' + winner;
      } else {
        //Change the “status” text in Board’s render to displays which player has the next turn
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
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
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);

  //helper function
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }  