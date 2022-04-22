import { legacy_createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { allcoinsReducer, coinInfoReducer, coinReducer, trendCoinsReducer } from './reducer'
const reducers = combineReducers({
    coinList: allcoinsReducer,
    trendCoins: trendCoinsReducer,
    oneCoin: coinReducer,
    coinInformaion: coinInfoReducer,
})
const initialStates = {

}
const middlewares = [thunk]
export const store = legacy_createStore(
    reducers,
    initialStates,
    composeWithDevTools(applyMiddleware(...middlewares))
)