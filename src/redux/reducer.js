import { combineReducers } from 'redux';

const setQuestions = (state = {}, action) =>{
    switch (action.type) {
        case "SET_QUESTIONS":
            return action.setQuestions;
        default:
            return state;
    }
}

export default combineReducers({
    setQuestions : setQuestions,
})
