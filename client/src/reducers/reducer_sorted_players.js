import { GET_PLAYERS } from '../actions/index'
import { APPLY_SORT } from '../actions/index'
import { sortType } from '../containers/player_table'

function sortPlayers(players, sortKey, sortAsc, sortAs) {
        
    players.sort((a,b) => {

        switch (sortAs) {
            case sortType.NUMBER:
                return sortAsc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey]; 
            case sortType.STRING:
            default:
                return sortAsc ? a[sortKey].toString().localeCompare(b[sortKey].toString()) : b[sortKey].toString().localeCompare(a[sortKey].toString()); 
        }
        
    });
}

export default function (
    state = { 
        players: [], 
        sortKey: "id",
        sortAsc: true,
        sortAs: sortType.NUMBER
        },
    action) {

    switch (action.type) {
        case GET_PLAYERS: 
        {
            //console.log("SortedPlayersReducer GET_PLAYERS received.  Players:", action.payload.data.players);
            let players = action.payload.data.players;
            sortPlayers(players, state.sortKey, state.sortAsc, state.sortAs);

            let newState = Object.assign({}, state);
            newState.players = players;
            return newState; 
        }
        case APPLY_SORT: 
        {
            //console.log("SortedPlayersReducer APPLY_SORT received. Payload: ", action.payload);
            let players = state.players;
            const {sortKey, sortAsc, sortAs} = action.payload; 
            sortPlayers(players, sortKey, sortAsc, sortAs);
            return {
                players,
                sortKey,
                sortAsc, 
                sortAs
            }; 
        }
        default:
    }
    return state;
}