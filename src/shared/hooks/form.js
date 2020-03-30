import { useCallback, useReducer } from 'react'


const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let isValid = true
      for (let inputId in state.inputs) {
        if ((inputId === action.inputId && !action.isValid) || (inputId !== action.inputId && !state.inputs[inputId].isValid)) {
          isValid = false
          break
        }
      }
      return {
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid
      }
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      }
    default:
      return state
  }
}

export const useForm = (initialInputs, initialIsValid) => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialIsValid
  })

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', inputId: id, value, isValid })
  }, [])

  const setFormData = useCallback((inputs, formIsValid) => {
    dispatch({ type: 'SET_DATA', inputs, formIsValid })
  }, [])


  return [state, inputHandler, setFormData]
}