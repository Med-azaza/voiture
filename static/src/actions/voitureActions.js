import axios from 'axios'
import {
  VOITURES_LIST_REQUEST,
  VOITURES_LIST_SUCCESS,
  VOITURES_LIST_FAIL,
  VOITURE_DETAILS_REQUEST,
  VOITURE_DETAILS_SUCCESS,
  VOITURE_DETAILS_FAIL,
  VOITURE_CREATE_REVIEW_REQUEST,
  VOITURE_CREATE_REVIEW_SUCCESS,
  VOITURE_CREATE_REVIEW_FAIL
    } from '../constants/voitureConstants'
import { logout } from './userActions'


//
export const getVoitures = () => async (dispatch) => {
  try {

      dispatch({ type: VOITURES_LIST_REQUEST })

      const { data } = await axios.get(`/api/voitures`)

      dispatch({
          type: VOITURES_LIST_SUCCESS,
          payload: data.voitures
      })

  } catch (error) {

      dispatch({
          type: VOITURES_LIST_FAIL,
          payload: error.response.data.message
      })
  }
}

export const ListVoitureDetails=(id)=> async(dispatch)=>{
  try{
      dispatch({type:VOITURE_DETAILS_REQUEST})
      const{data}=await axios.get(`/api/voitures/${id}`)

  dispatch({
      type: VOITURE_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: VOITURE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
}
}


export const createvoitureReview = (voitureId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: VOITURE_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/voitures/${voitureId}/reviews`, review, config)

    dispatch({
      type: VOITURE_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: VOITURE_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}