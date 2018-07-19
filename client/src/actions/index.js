import axios from 'axios'; 

const ROOT_URL="http://localhost:8080/players";


export const GET_PLAYERS = "GetPlayers";
export const APPLY_SORT = "ApplySort";

// action creators
export function getPlayers(term = null) {

    let playersUrl = ROOT_URL;
    if (term !== null && term !== undefined) {
        playersUrl = `${ROOT_URL}?search=${term}`;
    }

    // async (AJAX) call that returns a promise;  this promise will go 
    // through redux-promise middleware which will hold the dispatching until the promise
    // is resolved and threse is result from the webcall, then dispatch to
    //  reducer with response(not the original promise) as payload
    const request = axios.get(playersUrl);  


    //console.log('ActionCreator GET_PLAYERS called.  Request: ', request);

    return {
        type: GET_PLAYERS, 
        payload: request
    };
}

export function applySort(sortKey, sortAsc, sortAs) {

    //console.log(`ActionCreator APPLY_SORT called.  SortKey: ${sortKey}, sortAsc: ${sortAsc}, sortAs: ${sortAs}`); 
    return {
        type: APPLY_SORT, 
        payload: { sortKey, sortAsc, sortAs }
    };
}
