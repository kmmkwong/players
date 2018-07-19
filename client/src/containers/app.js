import _ from 'lodash'; 
import React, { Component } from 'react';
import './app.css';
import '../components/search_bar';
import SearchBar from '../components/search_bar';
import PlayerTable from './player_table';
import CountrySummary from './country_summary';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPlayers } from '../actions/index';


class App extends Component {


    componentDidMount() {
        this.props.getPlayers();
    }



    render() {

        // TODO : not sure how to get error in this case using redux promise
        // const { error, isLoaded, players } = this.state;
        // if (error) {
        //     return <div>Error: {error.message}</div>;

        if (!this.props.isLoaded) {
            return <div>Loading...</div>;
        } else {
            
            // throttling
            const getPlayers = _.debounce((term) => {this.props.getPlayers(term)}, 300);


            return (
                <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Players</h1>
                </header>
                <div className="container">
                    <SearchBar onSearchTermChange={ getPlayers } /> 
                    <CountrySummary/>
                    <PlayerTable/>
                </div>
                </div>
            );
        }
    }
}



function mapStateToProps({isLoaded}) {
    return {
        isLoaded
    }; 
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getPlayers}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 

