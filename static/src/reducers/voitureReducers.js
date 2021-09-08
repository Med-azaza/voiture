import {
    VOITURES_LIST_REQUEST,
    VOITURES_LIST_SUCCESS,
    VOITURES_LIST_FAIL,
    VOITURE_DETAILS_REQUEST,
    VOITURE_DETAILS_SUCCESS,
    VOITURE_DETAILS_FAIL,
    
    VOITURE_CREATE_REVIEW_RESET,
    VOITURE_CREATE_REVIEW_FAIL,
    VOITURE_CREATE_REVIEW_SUCCESS,
    VOITURE_CREATE_REVIEW_REQUEST,
    } from '../constants/voitureConstants'
export const voitureListReducer=(state = { voitures: [] }, action) => {
    switch(action.type){
        case VOITURES_LIST_REQUEST:
          return{loading:true, voitures:[]}
        
        
        case VOITURES_LIST_SUCCESS:
            return {
                loading: false,
                voitures: action.payload
            }
        case VOITURES_LIST_FAIL :
            return{loading:false, error:action.payload}
          default:
              return state
        }
}
export const voitureDetailsReducer=(state = { voiture: {reviews: [] } }, action) => {
    switch(action.type){
        case VOITURE_DETAILS_REQUEST:
            return{loading:true, ...state}
        
        case VOITURE_DETAILS_SUCCESS:
            return{loading:false, voiture:action.payload}
        case  VOITURE_DETAILS_FAIL:
            return{loading:false, error:action.payload}
          default:
              return state
        }
}

  
  
  
  export const voitureReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case VOITURE_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case VOITURE_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case VOITURE_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.payload }
      case VOITURE_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }
  
  