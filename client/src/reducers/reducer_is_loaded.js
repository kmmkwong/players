import { GET_PLAYERS } from '../actions/index'


export default function (state = false, action) {

    switch (action.type) {
        case GET_PLAYERS: 
            //console.log("IsLoadedReducer GET_PLAYERS received.  IsLoaded is set to true.");
            return true;
        default:
    }
    return state;
}