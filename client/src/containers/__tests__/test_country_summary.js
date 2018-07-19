import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { CountrySummary } from '../country_summary';

describe("Rendering country summary", () => {

    const countrySummary = {
        "CAN" : 2,
        "USA" : 1
    }

    it('Should render country summary without error', () => {
        expect(shallow(<CountrySummary countrySummary={countrySummary} /> ).find('div.grid-details').exists()).toBe(true)
    });

    it('Should render country summary correct info', () => {
        expect(shallow(<CountrySummary countrySummary={countrySummary} /> ).find('#CAN').text()).toEqual("CAN:2")
        expect(shallow(<CountrySummary countrySummary={countrySummary} /> ).find('#USA').text()).toEqual("USA:1")
    });
});