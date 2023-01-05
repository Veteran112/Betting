import { SET_RATESHEET, SET_ACTIVECOMPANYID } from '../actions/ratesheetActions'

const initialState = {
  active_company_id: null
}

export const ratesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RATESHEET:
      return {
        ...state,
        ...action.payload
      }
    case SET_ACTIVECOMPANYID:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
