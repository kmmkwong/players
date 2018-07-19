import { combineReducers } from 'redux';
import SortedPlayersReducer from './reducer_sorted_players';
import CountrySummaryReducer from './reducer_country_summary';
import IsLoadedReducer from './reducer_is_loaded';

const rootReducer = combineReducers({
    isLoaded: IsLoadedReducer,
    sortedPlayers: SortedPlayersReducer,
    countrySummary: CountrySummaryReducer
});

export default rootReducer;
