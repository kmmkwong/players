import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PlayerRow from '../player_row';

describe("Rendering a player in a table row", () => {

    const player = {
        birthPlace: "Cumaná",
        dob: "1994-05-17", 
        height: 1.86,
        id: 9, 
        name: "Anthony Blondell", 
        nationality: "VEN", 
        position: "F",
        weight: 77
    };

    it('Should render player row without error', () => {
        expect(shallow(<PlayerRow player={player} /> ).find('tr').exists()).toBe(true)
    });

    it('Should render player ID', () => {
        expect(shallow(<PlayerRow player={player} /> ).find('td').at(0).text()).toEqual(player.id.toString())
    });
    it('Should render player Name', () => {
        expect(shallow(<PlayerRow player={player} /> ).find('td').at(1).text()).toEqual(player.name)
    });
});