import React, { Component } from 'react';
import { connect } from 'react-redux';

export class CountrySummary extends Component {
    render() {

        // Generate grid contents from country summary
        let gridContent = [];
        const numCountry = Object.keys(this.props.countrySummary).length;
        const maxColCount = 12; 
        const colCount = Math.floor(maxColCount / numCountry); 
        let gridColName = "col-sm-" + colCount; 
        if (colCount <= 0) {
            gridColName = "col-sm-1";
        }
        for (let key in this.props.countrySummary) {
            let display = key + ":" + this.props.countrySummary[key];
            gridContent.push (<div id={ key } key={ key } className={ gridColName }>{ display }</div>);
        }

        return (
            <div className="row grid-details">
                { gridContent }
            </div>
        );    
    }
}

function mapStateToProps({countrySummary}) {
    return { countrySummary };
}

export default connect(mapStateToProps)(CountrySummary); 
