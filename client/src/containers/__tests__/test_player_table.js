import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { PlayerTable } from '../player_table';

describe("Rendering player table", () => {

    let wrapper; 
    const mockApplySort = jest.fn();
    const players = [
        {
            birthPlace: "Cumaná",
            dob: "1994-05-17", 
            height: 1.86,
            id: 9, 
            name: "Anthony Blondell", 
            nationality: "VEN", 
            position: "F",
            weight: 77
        },
        {
            birthPlace: "Vancouver",
            dob: "1994-05-17", 
            height: 1.86,
            id: 1, 
            name: "John Smith", 
            nationality: "CAN", 
            position: "D",
            weight: 75
        }
    ];
    beforeEach( () => {
        wrapper = shallow(<PlayerTable players={players} applySort={mockApplySort} />);
    });

    it('Should render player table without error', () => {
        expect(wrapper.find('table').find('tbody').exists()).toBe(true)
    });

    it('Should render player table with rows as in player list', () => {
        expect(wrapper.find('PlayerRow').length).toEqual(players.length); 
    });

    it('Should call applySort action when a column is clicked', () => {
        // TODO: not passing; haven't figured out how to similate the click in child
        wrapper.find('PlayerColumn').at(0).simulate('click');
        expect(mockApplySort.mock.calls.length).toEqual(1); 
    });
});