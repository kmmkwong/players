import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { applySort } from '../actions/index';
import PlayerRow from '../components/player_row';
import PlayerColumn from '../components/player_column';


export const sortType = Object.freeze({
    NUMBER:   "number",
    STRING:  "string"
});

export class PlayerTable extends Component {

    constructor (props) {
        super(props);
        this.state = {
            cols: [ 
                { key: "id",          displayName: "Shirt number", sortAs: sortType.NUMBER, Asc: true},
                { key: "name",        displayName: "Name", sortAs: sortType.STRING, Asc: null},
                { key: "position",    displayName: "Position", sortAs: sortType.STRING, Asc: null},
                { key: "nationality", displayName: "Nationality", sortAs: sortType.STRING, Asc: null},
                { key: "height",      displayName: "Height(M)", sortAs: sortType.NUMBER, Asc: null},
                { key: "weight",      displayName: "Weight(KG)", sortAs: sortType.NUMBER, Asc: null}, 
                { key: "dob",         displayName: "Date of Birth", sortAs: sortType.STRING, Asc: null},
                { key: "birthPlace",  displayName: "City of Birth", sortAs: sortType.STRING, Asc: null}
             ]
        };

        this.columnClicked = this.columnClicked.bind(this); 
    }

    columnClicked(colClicked) {

        // reset or toggle column asc/desc order as need
        const cols = this.state.cols;
        cols.forEach((col) => {
            if (col.key === colClicked.key) {
                if (col.Asc) {
                    col.Asc = !col.Asc;
                } else {
                    col.Asc = true;
                }
                
                // notify parent of sort change
                this.props.applySort(col.key, col.Asc, col.sortAs); 

            } else {
                col.Asc = null;
            }
        });
        this.setState({cols}); 
    }


    render() {

        const playerRows = this.props.players.map((player) => { 
            return (<PlayerRow 
                key={player.id}
                player={player} />);
        }); 

        const playerCols = this.state.cols.map((col) => {
            return (<PlayerColumn
                key= {col.key}
                col={col}
                onColumnClick={ this.columnClicked } />);
        });
    
        return (
            <table className="table table-bordered table-striped table-details">
                <thead className="table-content-details">
                    <tr>
                        { playerCols }
                    </tr>
                </thead>
                <tbody className="table-content-details">
                    { playerRows }
                </tbody>
            </table>
        );
    }
};

//export default PlayerTable;

function mapStateToProps({sortedPlayers}) {
    return {
        players: sortedPlayers.players
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({applySort}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTable);
