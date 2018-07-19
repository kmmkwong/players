import { GET_PLAYERS } from '../actions/index'


export default function (state = {}, action) {

    switch (action.type) {
        case GET_PLAYERS: 
            if (action.payload.data !== undefined && action.payload.data.players !== undefined) {
                //console.log("CountrySummaryReducer GET_PLAYERS received.  Players:", action.payload.data.players);
                const players = action.payload.data.players;
                let countrySummary = {};
                players.forEach((player => {
                    if (player.nationality in countrySummary) {
                        countrySummary[player.nationality]++;
                    } else {
                        countrySummary[player.nationality] = 1;
                    }
                }));
                // for (let key in countrySummary) {
                //     console.log("key:" + key + ", val:" + countrySummary[key]);
                // }
                return countrySummary;
            }
            break;
        default:
    }
    return state;
}