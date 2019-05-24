import { createStore, applyMiddleware,compose  } from 'redux'

import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import Immutable from 'immutable'
import thunk from 'redux-thunk';

import rootReducer from './reducers'
import saga from './saga' 


const logger = createLogger({
    stateTransformer: (state) => {
        let newState = {};
    
        for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        }
  
        return newState;
    }
})

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [sagaMiddleware, logger, thunk]


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

//const store = createStore(rootReducer, compose(middleware, Reactotron.createEnhancer()))

sagaMiddleware.run(saga)

export default store
