import React from 'react';
import PropTypes from 'prop-types';

function Square(props) {
  return (
    <button className={`square${props.value ? '-pop' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hotSquareClickCount: 0,
    };
  }

  resetHotSquareClickCount() {
    this.state.hotSquareClickCount = 0;
  }

  incrementHotSquareClickCount() {
    this.state.hotSquareClickCount += 1;
    if (this.state.hotSquareClickCount === 10) {
      this.props.unlockForms();
      this.state.hotSquareClickCount = 0;
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderHotSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.incrementHotSquareClickCount();
          this.props.onClick(i);
        }}
      />);
  }

  render() {
    return (
      <div>
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
          {this.renderHotSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string,
};

Square.defaultProps = {
  value: null,
};

Board.propTypes = {
  onClick: PropTypes.func.isRequired,
  unlockForms: PropTypes.func.isRequired,
  squares: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export {
  Board,
  Square,
};
