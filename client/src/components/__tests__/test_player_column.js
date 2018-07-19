import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PlayerColumn from '../player_column';

describe("Rendering a player column heading", () => {

    const col = { key: "id", displayName: "Shirt number", Asc: true};

    it('Should render column heading', () => {
        expect(shallow(<PlayerColumn col={col} /> ).find('th').exists()).toBe(true)
    });

    it('Should render arrow based on column Asc order being true', () => {
        const colAsc = { key: "id", displayName: "Shirt number", Asc: true};
        expect(shallow(<PlayerColumn col={colAsc} /> ).find("i").hasClass('fas fa-sort-up')).toBe(true)
    });

    it('Should render arrow based on column Asc order being false', () => {
        const colDesc = { key: "id", displayName: "Shirt number", Asc: false};
        expect(shallow(<PlayerColumn col={colDesc} /> ).find("i").hasClass('fas fa-sort-down')).toBe(true)
    });

    it('Should render arrow based on column Asc order being null', () => {
        const colNoSort = { key: "id", displayName: "Shirt number", Asc: null};
        expect(shallow(<PlayerColumn col={colNoSort} /> ).find("i").hasClass('fas fa-sort')).toBe(true)
    });

    it ('Should call callback if clicked', () => {
        const mockCallback = jest.fn();
        const wrapper = shallow(<PlayerColumn col={col} onColumnClick={mockCallback} />);
        wrapper.find('th').simulate('click'); 
        expect(mockCallback.mock.calls.length).toEqual(1); 
    });
});