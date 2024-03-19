import { useReducer } from 'react'

const initialState = {
  result: 0,
  firstOperand: 0,
  secondOperand: 0,
  operator: '+',
  total: 'decimal'
}

const reducer = (state, action) => {
  const firstOperand = state.firstOperand
  const secondOperand = state.secondOperand
  switch (action.type) {
    case 'first-operand':
      return { ...state, firstOperand: action.value }
    case 'second-operand':
      return { ...state, secondOperand: action.value }
    case '+':
      return {
        ...state,
        result: Number(firstOperand) + Number(secondOperand)
      }
    case '-':
      return {
        ...state,
        result: Number(firstOperand) - Number(secondOperand)
      }
    case '/':
      return {
        ...state,
        result: Number(firstOperand) / Number(secondOperand)
      }
    case '*':
      return {
        ...state,
        result: Number(firstOperand) * Number(secondOperand)
      }
    case 'option':
      return { ...state, operator: action.value }
    case 'decimal':
      return {
        ...state,
        firstOperand: calculateTo(firstOperand, 'decimal'),
        secondOperand: calculateTo(secondOperand, 'decimal'),
        result: calculateTo(state.result, 'decimal'),
        total: 'decimal'
      }
    case 'hexadecimal':
      return {
        ...state,
        firstOperand: calculateTo(firstOperand, 'hexadecimal'),
        secondOperand: calculateTo(secondOperand, 'hexadecimal'),
        result: calculateTo(state.result, 'hexadecimal'),
        total: 'hexadecimal'
      }
    case 'binary':
      return {
        ...state,
        firstOperand: calculateTo(firstOperand, 'binary'),
        secondOperand: calculateTo(secondOperand, 'binary'),
        result: calculateTo(state.result, 'binary'),
        total: 'binary'
      }
  }
}

const calculateTo = (value, total) => {
  switch (total) {
    case 'decimal':
      return Number(value)
    case 'binary':
      const convertedBinaryValue = Number(value).toString(2)
      if(isNaN(convertedBinaryValue)){
        return value
      }
      return convertedBinaryValue
    case 'hexadecimal':
      return Number(value).toString(16)
  }
}

const Calculadora = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSecondOperandChange = (event) => {
    const value = event.target.value

    if (!isNaN(value)) {
      dispatch({ type: 'second-operand', value: event.target.value })
    }
  }

  const handleFirstOperandChange = (event) => {
    const value = event.target.value
    if (!isNaN(value)) {
      dispatch({ type: 'first-operand', value: event.target.value })
    }
  }

  const handleClick = () => {
    dispatch({ type: state.operator })
  }

  const handleSelectChange = (event) => {
    dispatch({ type: 'option', value: event.target.value })
  }

  const handleDecimalClick = () => {
    dispatch({ type: 'decimal' })
  }

  const handleHexadecimalClick = () => {
    dispatch({ type: 'hexadecimal' })
  }

  const handleBinaryClick = () => {
    dispatch({ type: 'binary' })
  }

  return (
    <>
      <h1>Write only numbers for the operation to be successful</h1>
      <input
        type="text"
        onChange={handleFirstOperandChange}
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
        onChange={handleSecondOperandChange}
        value={state.secondOperand}
      />
      <input type="text" disabled value={state.result} />
      <button onClick={handleClick}>enter</button>
      <button onClick={handleDecimalClick}>decimal</button>
      <button onClick={handleHexadecimalClick}>hexadecimal</button>
      <button onClick={handleBinaryClick}>binario</button>
    </>
  )
}

export default Calculadora
