import React from 'react';

const PlayerColumn = ({col, onColumnClick}) => {

    let icon = col.Asc == null ? "fas fa-sort" : ( col.Asc ? "fas fa-sort-up" : "fas fa-sort-down");
    return (
        <th className="player-col" onClick={ () => onColumnClick(col) } >
            {col.displayName}
            <span style={{float : 'right', paddingRight: '5px'}}><i className={ icon }></i></span>
        </th>
    );
};

export default PlayerColumn;
