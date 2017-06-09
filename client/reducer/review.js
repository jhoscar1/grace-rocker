import axios from 'axios';

const initialState = ({
    productReviews: []
});

/* ------------------------------    ACTIONS    ------------------------------*/
const SET_REVIEW = 'SET_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const GET_REVIEWS = 'GET_REVIEWS';


/* --------------------------    ACTION-CREATORS    --------------------------*/

export const getReviews = (reviews) => ({ type: GET_REVIEWS, reviews})
export const setReview = (review) => ({ type: SET_REVIEW, review });
export const deleteReview = (review) => ({ type: DELETE_REVIEW, review });


/* -----------------------------  DISPATCHERS   ------------------------------*/



/* -----------------------------    REDUCERS    ------------------------------*/

export default (state = initialState, action) => {
    const newState = Object.assign({}, state);
    
    switch(action.type) {
        case SET_REVIEW:
            break;
        case GET_REVIEW:
            break;
        case DELETE_REVIEW:
            break;
        default:
            return state;
    }

    return newState;
}

