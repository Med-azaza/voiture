import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {voitureListReducer, voitureReviewCreateReducer, voitureDetailsReducer} from './reducers/voitureReducers'
import {userLoginReducer, userListReducer, userDeleteReducer, userUpdateReducer} from './reducers/userReducers'
import {userRegisterReducer} from './reducers/userReducers'
import {userDetailsReducer} from './reducers/userReducers'

const reducer=combineReducers({
    voitureList:voitureListReducer,
  voitureDetails:voitureDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails:userDetailsReducer,
  userList:userListReducer,
  userDelete: userDeleteReducer,
  userUpdate:userUpdateReducer,
  voitureReviewCreate:voitureReviewCreateReducer,
})
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
 
const intialState={
  
  userLogin: { userInfo: userInfoFromStorage },

}

  
const middleware=[thunk]

const  store=createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;