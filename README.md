# Tic-tac-toe from Reactjs official website

이 저장소는 [리액트 공식 튜토리얼](https://reactjs.org/tutorial/tutorial.html)을 학습하기 위해 만들었습니다. [@wonny-log](https://github.com/wonny-log) 님이 번역한 [한국어판 튜토리얼](https://github.com/wonny-log/Today-I-Learned/blob/master/Development/React_Tutorial.md)도 볼 수 있습니다.

This repo was made for studying react.js, based on [official tutorial](https://reactjs.org/tutorial/tutorial.html).
You can also read [a translated tutorial in Korean](https://github.com/wonny-log/Today-I-Learned/blob/master/Development/React_Tutorial.md)(by [@wonny-log](https://github.com/wonny-log)).

## 학습 메모

- `props` 파라미터를 사용
- `render`: 메서드로 뷰 계층 구조, React 엘리먼트 반환, 일반적으로 JSX 사용
- JSX: `<div />`는 `React.createElement('div')`로 변환

React 엘리먼트는 JavaScript 객체. 각 컴포넌트는 캡슐화되어 독립적으로 동작하기 때문에 간단한 컴포넌트들로 복잡한 UI 구현 가능.

React 컴포넌트는 컴포넌트별로 생성자에서 `this.state`를 설정하여 상태를 가짐.

JavaScript 클래스: 서브클래스의 생성자를 정의할 때 `super();` 메서드를 명시적으로 호출(부모의 `props`를 사용하기 위함)

상태 끌어올리기: 여러 하위 컴포넌트로부터 데이터를 모으거나 두 개의 하위 컴포넌트들이 서로 통신해야할 때 상위 컴포넌트 안으로 상태를 이동. 상위 컴포넌트는 props를 통해 하위 컴포넌트로 상태를 전달.

React 애플리케이션에서는 일반적으로 속성에 `on*`을, 핸들러 메서드에 `handle*`을 사용하여 처리

immutability의 중요성

- 컴포넌트와 전체 애플리케이션의 성능을 향상시키는 장점
- 데이터 변경을 피하면 이전 버전의 데이터를 참조/변경할 수 있음
- 객체의 변경 사항을 체크하기 쉬움(참조 객체가 이전과 다르다면 변경 확인 가능)
- 간단한 순수 컴포넌트들(pure components)이 다시 랜더링될 때를 결정하기 쉬움()

함수 컴포넌트
- render 메서드만으로 구성된 컴포넌트 타입을 위한 간단한 문법
- React.Component의 서브클래스보다 간단하게 props를 가져오고 랜더링할 것을 반환하는 함수
- 더 쉽게 작성할 수 있고 React가 더 효율적으로 최적화할 수 있습니다.

Keys

- 상태를 가진 컴포넌트를 랜더링한다면 컴포넌트가 어떻게 실행되는지와 관계없이 상태는 저장 되어야 함
- React는 네이티브 뷰의 뒤에 참고할 것을 저장
- 리스트의 각 요소에서 key 속성을 지정
- 아이템을 데이터베이스의 객체와 일치시켜야 한다면 데이터베이스 ID를 key로 사용
- 엘리먼트가 만들어질때 React는 key 속성을 가져오고 반환된 엘리먼트에 직접적으로 key를 저장
- key가 props의 한 부분으로 보일지라도 이것은 this.props.key로 참조할 수 없음
- React는 어떤 하위 엘리먼트가 수정될지 결정하는 동안 알아서 key를 사용
- 컴포넌트가 자신의 키를 알 수 있는 방법은 없음
- 동적으로 리스트를 빌드할 때마다 적당한 키를 할당할 것을 강력 추천

key 사용시 권장하지 않는 방법

- 특정한 키를 구분하지 못한다면 React는 경고를 주고 배열 인덱스를 키로 사용
- 만약 리스트에 있는 엘리먼트들을 정렬하거나 리스트에 있는 버튼을 통해 지우거나 추가하면 명시적으로 key={i}를 전달하는 방법

## 체크사항

### handleClick()에서 slice() 사용한 이유

````js

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
  // ...
````

이미 존재하는 배열을 수정하지 않고 변경 사항을 반영하기 위해 squares 배열을 .slice() 연산자를 사용하여 복사한 것. 컴포넌트와 전체 애플리케이션의 성능을 향상시킴

### 순수 컴포넌트(pure components) 정의

"React.PureComponent를 확장해서 컴포넌트를 만들면, shouldComponentUpdate 메쏘드를 선언하지 않았다고 하더라도, PureComponent 내부에서 props와 state를 shallow level 안에서 비교 하여, 변경된 값이 있을 시에만 리렌더링 하도록 되어 있다."

- 참고: [리액트(React) 이해 기초 - Component vs PureComponent vs Functional Component](https://www.vobour.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-react-%EC%9D%B4%ED%95%B4-%EA%B8%B0%EC%B4%88-component-vs-purecomp)

### Game 컴포넌트의 handleClick()

`if (calculateWinner(squares) || squares[i]) {`와 `history: history.concat([{ squares: squares }]),` 의미

````js
handleClick(i) {
  const history = this.state.history;
  const current = history[history.length - 1];
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }
  squares[i] = this.state.xIsNext ? 'X' : 'O';
  this.setState({
    history: history.concat([{
      squares: squares,
    }]),
    xIsNext: !this.state.xIsNext,
  });
}
````
