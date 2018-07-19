import React from 'react';

const PlayerRow = ({player}) => {

    return (
        <tr>
            <td>{player.id}</td>
            <td>{player.name}</td>
            <td>{player.position}</td>
            <td>{player.nationality}</td>
            <td>{player.height}</td>
            <td>{player.weight}</td>
            <td>{player.dob}</td>
            <td>{player.birthPlace}</td>
        </tr>
    );
};

export default PlayerRow;
