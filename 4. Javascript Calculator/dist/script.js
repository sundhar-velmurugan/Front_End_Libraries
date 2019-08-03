/*----------------------COMPONENTS-------------------------*/
const Calculator = props => {
  return (
    React.createElement("div", { id: "calculator" },
    React.createElement("div", { id: "display-conatiner" },
    React.createElement("div", { id: "expression" }, React.createElement("p", null, props.expression)),
    React.createElement("div", { id: "display" }, React.createElement("p", null, props.input))),

    React.createElement("div", { id: "panel" },
    React.createElement("div", { id: "leftPanel" },
    React.createElement(TopButtonsContainer, null),
    React.createElement(NumbersContainer, null),
    React.createElement(BottomButtonsContainer, null)),

    React.createElement("div", { id: "rightPanel" },
    React.createElement(OperatorsContainer, null)))));




};

const TopButtons = props => {
  return (
    React.createElement("div", { id: "topButtons" },
    React.createElement(Button, { id: "clear", name: "AC", className: "btn btn-danger btn-square", onClick: name => props.clearClick(name) }),
    React.createElement(Button, { id: "equals", name: "=", className: "btn btn-success btn-square", onClick: name => props.equalClick(name) })));


};

const Numbers = props => {
  return (
    React.createElement("div", { id: "numbers" },
    React.createElement(Button, { id: "one", name: "1", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "two", name: "2", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "three", name: "3", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "four", name: "4", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "five", name: "5", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "six", name: "6", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "seven", name: "7", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "eight", name: "8", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "nine", name: "9", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) })));


};

const BottomButtons = props => {
  return (
    React.createElement("div", { id: "bottomButtons" },
    React.createElement(Button, { id: "zero", name: "0", className: "btn btn-info btn-square", onClick: name => props.numberClick(name) }),
    React.createElement(Button, { id: "decimal", name: ".", className: "btn btn-secondary btn-square", onClick: name => props.decimalClick(name) })));


};

const Operators = props => {
  return (
    React.createElement(React.Fragment, null,
    React.createElement(Button, { id: "add", name: "+", className: "btn btn-dark btn-square", onClick: name => props.operatorClick(name) }),
    React.createElement(Button, { id: "subtract", name: "-", className: "btn btn-dark btn-square", onClick: name => props.operatorClick(name) }),
    React.createElement(Button, { id: "multiply", name: "X", className: "btn btn-dark btn-square", onClick: name => props.operatorClick(name) }),
    React.createElement(Button, { id: "divide", name: "/", className: "btn btn-dark btn-square", onClick: name => props.operatorClick(name) })));


};

const Button = props => {
  let { name, id, className } = props;
  return React.createElement("button", { id: id, className: className, onClick: () => props.onClick(name) }, name);
};

/*----------------------UTILS-------------------------*/
function compute(op1, op2, op) {
  op1 = Number(op1);
  op2 = Number(op2);
  if (op === "+") {
    return op1 + op2;
  } else if (op === "-") {
    return op1 - op2;
  } else if (op === "X") {
    return op1 * op2;
  } else if (op === "/") {
    return op1 / op2;
  }
}

function getPrecedence(operator) {
  switch (operator) {
    case '/':
      return 4;
    case 'X':
      return 3;
    case '+':
    case '-':
      return 1;
    default:
      return 0;}

}

function parser(expression) {
  let values = [];
  let operators = new Set(['+', '-', '/', 'X']);
  let token = '';
  for (let i = 0, len = expression.length; i < len; i++) {
    //unary '-' operator - prev character is operator or no prev character
    if (expression[i] === '-' && (operators.has(expression[i - 1]) || !expression[i - 1])) {
      token = token.concat(expression[i]);
    } else if (operators.has(expression[i])) {
      values.push(token, expression[i]);
      token = '';
    } else {
      token = token.concat(expression[i]);
    }
  }
  //pushing the last operand in the expression
  if (token) {
    values.push(token);
  }
  return values;
}

function calculate(expression) {
  let parsedExp = parser(expression);
  let operandStack = [];
  let operatorStack = ['#'];
  for (let i = 0, len = parsedExp.length; i < len; i++) {
    if (!isNaN(Number(parsedExp[i]))) {
      operandStack.push(parsedExp[i]);
    } else {
      let op1 = operatorStack.pop();
      let op2 = parsedExp[i];
      if (getPrecedence(op1) < getPrecedence(op2)) {
        operatorStack.push(op1, op2);
      } else
      {
        while (getPrecedence(op1) >= getPrecedence(op2)) {
          let oper2 = operandStack.pop();
          let oper1 = operandStack.pop();
          operandStack.push(compute(oper1, oper2, op1));
          op1 = operatorStack.pop();
        }
        operatorStack.push(op1, op2);
      }
    }
  }
  operatorStack.shift();
  while (operatorStack.length) {
    let op = operatorStack.pop();
    let oper2 = operandStack.pop();
    let oper1 = operandStack.pop();
    operandStack.push(compute(oper1, oper2, op));
  }
  return operandStack.join('');
}

/*----------------------REDUCERS-------------------------*/
const reducer = (state = {}, action) => {
  let newState = { ...state };
  if (action.type === 'NUMBER_CLICK') {
    if (newState.input === '0') {
      //'number' - converted to Number because '0'->0 which is false, but Boolean('0') is true
      newState.expression = Number(action.number) ? newState.expression.concat(action.number) : newState.expression;
      newState.input = action.number;
    } else if (newState.input.length <= 20) {
      newState.expression = newState.expression.concat(action.number);
      newState.input = newState.input.concat(action.number);
    }
    return newState;
  } else if (action.type === 'DECIMAL_CLICK') {
    if (newState.input.indexOf('.') === -1 && newState.input.length <= 20) {
      newState.expression = newState.expression.concat('.');
      newState.input = newState.input.concat('.');
    }
    return newState;
  } else if (action.type === 'OPERATOR_CLICK') {
    let symbols = new Set(['+', '-', 'X', '/', '.']);
    let lastCharacter = newState.expression[newState.expression.length - 1];
    let secondLastCharacter = newState.expression[newState.expression.length - 2];
    if (lastCharacter && !symbols.has(lastCharacter)) {
      newState.expression = newState.expression.concat(action.operator);
      newState.input = '0';
    } else if (action.operator === '-') {
      //avoiding multiple unary '-'
      if (!symbols.has(secondLastCharacter)) {
        newState.expression = newState.expression.concat(action.operator);
        newState.input = action.operator;
      }
    } else {
      //replacing old operator with a new one
      if (lastCharacter === '-' && symbols.has(secondLastCharacter)) {
        //might added unary operator, therefore 2 useless operators will be present in expression when 3rd operator comes, so need to replace both with a new one
        newState.expression = newState.expression.slice(0, -2).concat(action.operator);
      } else {
        //replacing existing one with a new one
        newState.expression = newState.expression.slice(0, -1).concat(action.operator);
      }
    }
    return newState;
  } else if (action.type === 'EQUAL_CLICK') {
    let result = calculate(newState.expression);
    newState.expression = result;
    newState.input = result;
    return newState;
  } else if (action.type === 'CLEAR_CLICK') {
    newState.expression = '';
    newState.input = '0';
    return newState;
  }
  return state;
};

/*----------------------ACTIONS-------------------------*/
//try bind action creator
const numberClick = number => ({
  type: 'NUMBER_CLICK',
  number });

const decimalClick = () => ({
  type: 'DECIMAL_CLICK' });

const operatorClick = operator => ({
  type: 'OPERATOR_CLICK',
  operator });

const equalClick = () => ({
  type: 'EQUAL_CLICK' });

const clearClick = () => ({
  type: 'CLEAR_CLICK' });


/*----------------------CONSTANTS-------------------------*/
const initialState = {
  expression: '',
  input: '0' };


/*----------------------STORE-------------------------*/
const store = Redux.createStore(reducer, initialState);

const CalculatorContainer = ReactRedux.connect(
state => ({
  expression: state.expression,
  input: state.input }))(

Calculator);

const TopButtonsContainer = ReactRedux.connect(
null,
(dispatch) =>
Redux.bindActionCreators({
  equalClick,
  clearClick },
dispatch))(

TopButtons);

const NumbersContainer = ReactRedux.connect(
null,
(dispatch) =>
Redux.bindActionCreators({
  numberClick },
dispatch))(

Numbers);

const BottomButtonsContainer = ReactRedux.connect(
null,
(dispatch) =>
Redux.bindActionCreators({
  numberClick,
  decimalClick },
dispatch))(

BottomButtons);

const OperatorsContainer = ReactRedux.connect(
null,
(dispatch) =>
Redux.bindActionCreators({
  operatorClick },
dispatch))(

Operators);

/*----------------------RENDER-------------------------*/
ReactDOM.render(
React.createElement(ReactRedux.Provider, { store: store },
React.createElement(CalculatorContainer, null)),

document.getElementById('root'));