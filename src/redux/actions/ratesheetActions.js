// You can use CONSTANTS.js file for below definitions of constants and import here.
export const SET_RATESHEET = 'SET_RATESHEET'
export const SET_ACTIVECOMPANYID = 'SET_ACTIVECOMPANYID'

export const setRatesheet = (payload) => ({
  type: SET_RATESHEET,
  payload
})

export const setActiveCompanyID = (payload) => ({
  type: SET_ACTIVECOMPANYID,
  payload
})
