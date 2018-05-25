import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* 작성해야 하는 목록
// ==========================
// 1. Square: 클래스에서 function으로 변경
// 1. Square: props로 값 할당
// 1. Board: 현재 플레이어를 표시하는 .status를 Game에 구현
// 1. Game: history 라는 키에 Board의 상태를 저장하고 있는 history 객체 할당 -> slice() 사용
// 1. Game: 플레이어가 클릭할 때마다 history 업데이트 -> concat 매서드 사용
// 1. Game: xIsNext 값을 통해 지금 플레이할 플레이어를 판단
// 1. winner?? 헬퍼 함수로 승패 판단
// 1. Game: 각 플레이어의 턴 변경
// 1. Game: .game-info에 화면의 현재 상태를 목록 안의 버튼으로 출력(시간 여행) -> map 매서드 사용
// 1. Game: 시간 여행 클릭시 당시 상태로 돌아감 -> 다음 플레이어 체크 필요합
*/

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
