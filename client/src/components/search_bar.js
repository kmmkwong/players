import React, { Component } from 'react';

class SearchBar extends Component {
    constructor (props) {
        super(props);
        this.state = { term : ''};  
    }

    render () {
        return (
            <div className="search-bar input-group">
                <span className="input-group-addon"><i className="fas fa-search"></i></span>
                <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    value= {this.state.term}
                    onChange={ (event) => this.onInputChanged(event.target.value) } 
                /> 
            </div>
        );
    }

    onInputChanged (term) {
        //console.log(event);
        this.setState({term}); 
        this.props.onSearchTermChange(term); 
    }
}

export default SearchBar;   
