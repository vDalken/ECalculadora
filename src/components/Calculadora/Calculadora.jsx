import { useReducer } from 'react'

const initialState = {
  result: 0,
  firstOperand: 0,
  secondOperand: 0,
  operator: '+',
  total: 'decimal'
}

const reducer = (state, action) => {
  const { firstOperand, secondOperand } = state

  switch (action.type) {
    case 'first-operand':
      return { ...state, firstOperand: action.value }
    case 'second-operand':
      return { ...state, secondOperand: action.value }
    case '+':
    case '-':
    case '/':
    case '*':
      return {
        ...state,
        result: Number(firstOperand) + Number(secondOperand)
      }
    case 'option':
      return { ...state, operator: action.value }
    case 'decimal':
    case 'hexadecimal':
    case 'binary':
      return {
        ...state,
        ...convertToBase(state, action.type)
      }
    default:
      return state
  }
}

const convertToBase = (state, total) => {
  const { firstOperand, secondOperand, result } = state
  return {
    firstOperand: calculateTo(firstOperand, total),
    secondOperand: calculateTo(secondOperand, total),
    result: calculateTo(result, total),
    total: total
  }
}

const calculateTo = (value, total) => {
  switch (total) {
    case 'decimal':
      return isNaN(Number(value)) ? parseInt(value, 16) : Number(value)
    case 'binary':
      return isNaN(Number(value).toString(2))
        ? parseInt(value, 16).toString(2)
        : Number(value).toString(2)
    case 'hexadecimal':
      return Number(value).toString(16)
  }
}

const Calculadora = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleOperandChange = (event, operandType) => {
    const value = event.target.value

    if (!isNaN(value)) {
      dispatch({ type: operandType, value: event.target.value })
    }
  }

  const handleClick = () => {
    dispatch({ type: state.operator })
  }

  const handleSelectChange = (event) => {
    dispatch({ type: 'option', value: event.target.value })
  }

  const handleConversionClick = (type) => {
    dispatch({ type: type })
  }

  return (
    <>
      <h1>Write only numbers for the operation to be successful</h1>
      <input
        type="text"
        onChange={(event) => handleOperandChange(event, 'first-operand')}
        value={state.firstOperand}
      />
      <select onChange={handleSelectChange}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="/">/</option>
        <option value="*">*</option>
      </select>
      <input
        type="text"
        onChange={(event) => handleOperandChange(event, 'second-operand')}
        value={state.secondOperand}
      />
      <input type="text" disabled value={state.result} />
      <button onClick={handleClick}>enter</button>
      <button onClick={() => handleConversionClick('decimal')}>decimal</button>
      <button onClick={() => handleConversionClick('hexadecimal')}>
        hexadecimal
      </button>
      <button onClick={() => handleConversionClick('binary')}>binary</button>
    </>
  )
}

export default Calculadora
