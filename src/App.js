import { useReducer } from 'react';
import './App.css';
import DigitButton from './DigitButton';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  CHOOSE_OPERATION: 'choose-operation',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        currentOperand: '',
        previousOperand: '',
        operation: '',
      };
    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        operation: payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: '',
      };
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    default:
      return state;
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '/' } })}>/</button>
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '*' } })}>*</button>
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '+' } })}>+</button>
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation: '-' } })}>-</button>
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
    </div>
  );
}

export default App;
